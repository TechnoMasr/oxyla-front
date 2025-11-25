import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../../components/form/AuthCard";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import googleIcon from "../../assets/icons/google-icon.png";
import { registerUser } from "../../services/authServices"; // المسار حسب مشروعك
import SuccessModal from "../../components/modals/SuccessModal";
import { useState } from "react";

const Signup = () => {
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();

  // ✅ تعريف الـ validation schema
  const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email or phone is required")
      .test("emailOrPhone", "Must be a valid email or phone", (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  // ✅ إعداد الفورم
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  // ✅ إعداد الـ mutation من React Query
  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: () => {
      setSuccessModal(true);
      reset();
    },
  });

  // ✅ عند الإرسال
  const onSubmit = (data) => {
    mutate(data);
  };

  const handleCloseModal = () => {
    setSuccessModal(false);
    navigate("/signin");
  };

  return (
    <section className="container pagePadding">
      <AuthCard title={"sign up"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <MainInput
            id="name"
            label="Name"
            placeholder="Name"
            register={register("name")}
            error={errors.name?.message}
          />

          <MainInput
            id="email"
            label="Email / Phone"
            placeholder="Email / Phone"
            register={register("email")}
            error={errors.email?.message}
          />

          <MainInput
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register("password")}
            error={errors.password?.message}
          />

          <MainInput
            id="password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            register={register("password_confirmation")}
            error={errors.password_confirmation?.message}
          />

          <FormBtn title={"Sign Up"} loading={isPending} />

          <div className="divider">OR</div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <img src={googleIcon} alt="google icon" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 text-sm hover:underline inline-block"
            >
              Sign in
            </Link>
          </p>

          <FormError errorMsg={error?.response?.data?.message} />
        </form>
      </AuthCard>

      <SuccessModal
        openModal={successModal}
        onClose={handleCloseModal}
        msg="Account created successfully"
        onConfirm={handleCloseModal}
        btnText="OK"
      />
    </section>
  );
};

export default Signup;

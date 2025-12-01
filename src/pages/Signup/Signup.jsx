import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthCard from "../../components/form/AuthCard";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import googleIcon from "../../assets/icons/google-icon.png";
import { registerUser } from "../../services/authServices";
import SuccessModal from "../../components/modals/SuccessModal";

const Signup = () => {
  const { t } = useTranslation();
  const [successModal, setSuccessModal] = useState(false);
  const navigate = useNavigate();

  const signupSchema = yup.object().shape({
    name: yup.string().required(t("signup.nameRequired")),
    email: yup
      .string()
      .required(t("signup.emailRequired"))
      .test("emailOrPhone", t("signup.emailOrPhoneInvalid"), (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    password: yup
      .string()
      .required(t("signup.passwordRequired"))
      .min(6, t("signup.passwordMin")),
    password_confirmation: yup
      .string()
      .required(t("signup.confirmPasswordRequired"))
      .oneOf([yup.ref("password")], t("signup.passwordsMustMatch")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: () => {
      setSuccessModal(true);
      reset();
    },
  });

  const onSubmit = (data) => mutate(data);

  const handleCloseModal = () => {
    setSuccessModal(false);
    navigate("/signin");
  };

  return (
    <section className="container pagePadding">
      <AuthCard title={t("signup.title")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <MainInput
            id="name"
            label={t("signup.name")}
            placeholder={t("signup.name")}
            register={register("name")}
            error={errors.name?.message}
          />

          <MainInput
            id="email"
            label={t("signup.emailPhone")}
            placeholder={t("signup.emailPhone")}
            register={register("email")}
            error={errors.email?.message}
          />

          <MainInput
            id="password"
            label={t("signup.password")}
            type="password"
            placeholder={t("signup.password")}
            register={register("password")}
            error={errors.password?.message}
          />

          <MainInput
            id="password_confirmation"
            label={t("signup.confirmPassword")}
            type="password"
            placeholder={t("signup.confirmPassword")}
            register={register("password_confirmation")}
            error={errors.password_confirmation?.message}
          />

          <FormBtn title={t("signup.signUp")} loading={isPending} />

          <div className="divider">{t("signup.or")}</div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <img src={googleIcon} alt="google icon" />
            <span>{t("signup.signInWithGoogle")}</span>
          </button>

          <p className="text-sm text-gray-600 text-center">
            {t("signup.alreadyHaveAccount")}{" "}
            <Link
              to="/signin"
              className="text-blue-600 text-sm hover:underline inline-block"
            >
              {t("signup.signIn")}
            </Link>
          </p>

          <FormError errorMsg={error?.response?.data?.message} />
        </form>
      </AuthCard>

      <SuccessModal
        openModal={successModal}
        onClose={handleCloseModal}
        msg={t("signup.successMsg")}
        onConfirm={handleCloseModal}
        btnText={t("signup.ok")}
      />
    </section>
  );
};

export default Signup;

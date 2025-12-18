import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";

import AuthCard from "../../components/form/AuthCard";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import googleIcon from "../../assets/icons/google-icon.png";
import { registerUser } from "../../services/authServices";
import PhoneInputComponent from "../../components/form/PhoneInputComponent";
import { getProfileAct } from "../../store/profile/profileSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------------- VALIDATION SCHEMA ----------------
  const signupSchema = yup.object().shape({
    name: yup.string().required(t("signup.nameRequired")),
    email: yup
      .string()
      .email(t("signup.emailInvalid"))
      .required(t("signup.emailRequired")),
    phone: yup
      .string()
      .required(t("signup.phoneRequired"))
      .min(8, t("signup.phoneInvalid")),
    password: yup
      .string()
      .required(t("signup.passwordRequired"))
      .min(6, t("signup.passwordMin")),
    password_confirmation: yup
      .string()
      .required(t("signup.confirmPasswordRequired"))
      .oneOf([yup.ref("password")], t("signup.passwordsMustMatch")),
  });

  // ---------------- FORM ----------------
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  // ---------------- API MUTATION ----------------
  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: () => {
      reset();
      dispatch(getProfileAct())
        .unwrap()
        .then(() => {
          navigate("/verify-email", { replace: true });
        });
    },
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      phone: data.phone, // e.g. +20123456789
    });
  };

  // ---------------- UI ----------------
  return (
    <section className="container pagePadding">
      <AuthCard title={t("signup.title")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <MainInput
            id="name"
            label={t("signup.name")}
            placeholder={t("signup.name")}
            register={register("name")}
            error={errors.name?.message}
          />

          {/* EMAIL */}
          <MainInput
            id="email"
            label={t("signup.email")}
            placeholder={t("signup.email")}
            register={register("email")}
            error={errors.email?.message}
          />

          {/* PHONE */}
          <PhoneInputComponent
            label="Phone"
            id="phone"
            placeholder="Enter phone number"
            setValue={setValue}
            error={errors.phone?.message}
          />

          {/* PASSWORD */}
          <MainInput
            id="password"
            type="password"
            label={t("signup.password")}
            placeholder={t("signup.password")}
            register={register("password")}
            error={errors.password?.message}
          />

          {/* CONFIRM PASSWORD */}
          <MainInput
            id="password_confirmation"
            type="password"
            label={t("signup.confirmPassword")}
            placeholder={t("signup.confirmPassword")}
            register={register("password_confirmation")}
            error={errors.password_confirmation?.message}
          />

          <FormBtn title={t("signup.signUp")} loading={isPending} />

          {/* <div className="divider">{t("signup.or")}</div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <img loading="lazy" src={googleIcon} alt="google icon" />
            <span>{t("signup.signInWithGoogle")}</span>
          </button> */}

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
    </section>
  );
};

export default Signup;

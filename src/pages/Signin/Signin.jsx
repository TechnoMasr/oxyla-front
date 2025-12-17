import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthCard from "../../components/form/AuthCard";
import MainInput from "../../components/form/MainInput";
import PhoneInputComponent from "../../components/form/PhoneInputComponent";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import googleIcon from "../../assets/icons/google-icon.png";
import { loginUser } from "../../services/authServices";
import { getProfileAct } from "../../store/profile/profileSlice";

const Signin = () => {
  const { t } = useTranslation();
  const [method, setMethod] = useState("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------------- VALIDATION ----------------
  const signinSchema = yup.object().shape({
    email: yup
      .string()
      .nullable()
      .when([], {
        is: () => method === "email",
        then: (schema) =>
          schema
            .required(t("signin.emailRequired"))
            .email(t("signin.emailInvalid")),
      }),
    phone: yup
      .string()
      .nullable()
      .when([], {
        is: () => method === "phone",
        then: (schema) =>
          schema
            .required(t("signin.phoneRequired"))
            .min(8, t("signin.phoneInvalid")),
      }),
    password: yup.string().required(t("signin.passwordRequired")),
  });

  // ---------------- FORM ----------------
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  // ---------------- API ----------------
  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: () => {
      navigate("/profile/appointment", { replace: true });
      dispatch(getProfileAct());
      reset();
    },
  });

  const onSubmit = (data) => {
    if (method === "email") data.phone = null;
    if (method === "phone") data.email = null;
    mutate(data);
  };

  return (
    <section className="container pagePadding">
      <AuthCard title={t("signin.title")}>
        {/* --- Switch buttons --- */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg ${
              method === "email"
                ? "bg-myGreen text-white"
                : "bg-gray-200 text-black hover:brightness-85 cursor-pointer"
            }`}
            onClick={() => setMethod("email")}
          >
            {t("signin.email")}
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg ${
              method === "phone"
                ? "bg-myGreen text-white"
                : "bg-gray-200 text-black hover:brightness-85 cursor-pointer"
            }`}
            onClick={() => setMethod("phone")}
          >
            {t("signin.phone")}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {method === "email" ? (
            <MainInput
              id="email"
              label={t("signin.email")}
              placeholder={t("signin.email")}
              register={register("email")}
              error={errors.email?.message}
            />
          ) : (
            <PhoneInputComponent
              label={t("signin.phone")}
              id="phone"
              placeholder={t("signin.phone")}
              setValue={setValue}
              error={errors.phone?.message}
            />
          )}

          <MainInput
            id="password"
            label={t("signin.password")}
            type="password"
            placeholder={t("signin.password")}
            register={register("password")}
            error={errors.password?.message}
          />

          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm hover:underline inline-block"
          >
            {t("signin.forgotPassword")}
          </Link>

          <FormBtn title={t("signin.signIn")} loading={isPending} />

          {/* <div className="divider">{t("signin.or")}</div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <img loading="lazy" src={googleIcon} alt="google icon" />
            <span>{t("signin.signInWithGoogle")}</span>
          </button> */}

          <p className="text-sm text-gray-600 text-center">
            {t("signin.dontHaveAccount")}{" "}
            <Link
              to="/signup"
              className="text-blue-600 text-sm hover:underline inline-block"
            >
              {t("signin.signUp")}
            </Link>
          </p>

          <FormError errorMsg={error?.response?.data?.message} />
        </form>
      </AuthCard>
    </section>
  );
};

export default Signin;

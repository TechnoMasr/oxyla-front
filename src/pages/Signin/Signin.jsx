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
import { loginUser } from "../../services/authServices";
import SuccessModal from "../../components/modals/SuccessModal";
import { getProfileAct } from "../../store/profile/profileSlice";
import { useDispatch } from "react-redux";

const Signin = () => {
  const { t } = useTranslation();
  const [successModal, setSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinSchema = yup.object().shape({
    email: yup
      .string()
      .required(t("signin.emailRequired"))
      .test("emailOrPhone", t("signin.emailOrPhoneInvalid"), (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    password: yup.string().required(t("signin.passwordRequired")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: () => {
      setSuccessModal(true);
      reset();
    },
  });

  const onSubmit = (data) => mutate(data);

  const handleCloseModal = () => {
    setSuccessModal(false);
    navigate("/", { replace: true });
    dispatch(getProfileAct());
  };

  return (
    <section className="container pagePadding">
      <AuthCard title={t("signin.title")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <MainInput
            id="email"
            label={t("signin.emailPhone")}
            placeholder={t("signin.emailPhone")}
            register={register("email")}
            error={errors.email?.message}
          />

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

          <div className="divider">{t("signin.or")}</div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg flex items-center justify-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <img src={googleIcon} alt="google icon" />
            <span>{t("signin.signInWithGoogle")}</span>
          </button>

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

      <SuccessModal
        openModal={successModal}
        onClose={handleCloseModal}
        msg={t("signin.successMsg")}
        onConfirm={handleCloseModal}
        btnText={t("signin.ok")}
      />
    </section>
  );
};

export default Signin;

import AuthCard from "../../../components/form/AuthCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import MainInput from "../../../components/form/MainInput";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { resetPassword } from "../../../services/forgotPasswordServices";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ResetPassword = ({ parentData, setParentData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(8, t("resetPassword.errors.minLength"))
      .required(t("resetPassword.errors.required"))
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
        t("resetPassword.errors.pattern"),
      ),
    password_confirmation: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], t("resetPassword.errors.match"))
      .required(t("resetPassword.errors.confirmRequired")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    mutate,
    isPending,
    isError,
    error: apiError,
  } = useMutation({
    mutationFn: (payload) => resetPassword(payload),
    onSuccess: (res, payload) => {
      setParentData((prev) => ({
        ...prev,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      }));
      toast.success(t("resetPassword.successMsg"));
      navigate("/signin");
    },
    onError: (err) => {
      console.error("❌ Reset password error:", err);
    },
  });

  const passwordValue = watch("password", "");

  const evaluateStrength = (password) => {
    const cleanPassword = password.replace(/\s/g, "");
    let strength = 0;
    if (cleanPassword.length >= 8) strength++;
    if (/[A-Z]/.test(cleanPassword)) strength++;
    if (/[0-9]/.test(cleanPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(cleanPassword)) strength++;
    return strength;
  };

  const strength = evaluateStrength(passwordValue);
  const strengthPercent = (strength / 4) * 100;

  const getStrengthLabel = () => {
    if (strength <= 1) return t("resetPassword.passwordStrength.weak");
    if (strength === 2) return t("resetPassword.passwordStrength.medium");
    if (strength === 3) return t("resetPassword.passwordStrength.strong");
    return t("resetPassword.passwordStrength.veryStrong");
  };

  const getGradient = () => {
    if (strength <= 1) return "bg-gradient-to-r from-red-500 to-red-600";
    if (strength === 2) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (strength === 3) return "bg-gradient-to-r from-blue-500 to-blue-700";
    return "bg-gradient-to-r from-green-500 to-emerald-600";
  };

  const onSubmit = (data) => {
    const payload = {
      email: parentData.email,
      otp: parentData.otp,
      password: data.password,
      password_confirmation: data.password_confirmation,
      reset_token: parentData.reset_token,
    };
    mutate(payload);
  };

  const displayError =
    (isError &&
      (apiError?.response?.data?.message || t("resetPassword.apiError"))) ||
    "";

  return (
    <AuthCard title={t("resetPassword.title")} backBtn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <MainInput
            label={t("resetPassword.newPassword")}
            id="password"
            type="password"
            register={register("password")}
            error={errors.password?.message}
          />

          {passwordValue && (
            <div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-1.5 ${getGradient()} transition-all duration-300 rounded-full`}
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>

              <p
                className={`mt-1 font-medium text-sm ${
                  strength <= 1
                    ? "text-red-600"
                    : strength === 2
                      ? "text-yellow-600"
                      : strength === 3
                        ? "text-blue-600"
                        : "text-green-600"
                }`}
              >
                {getStrengthLabel()}
              </p>
            </div>
          )}
        </div>

        <MainInput
          label={t("resetPassword.confirmPassword")}
          id="password_confirmation"
          type="password"
          register={register("password_confirmation")}
          error={errors.password_confirmation?.message}
        />

        <FormError errorMsg={displayError} />

        <FormBtn title={t("resetPassword.resetBtn")} loading={isPending} />
      </form>
    </AuthCard>
  );
};

export default ResetPassword;

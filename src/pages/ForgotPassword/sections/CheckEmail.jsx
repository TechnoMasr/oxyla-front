import AuthCard from "../../../components/form/AuthCard";
import MainInput from "../../../components/form/MainInput";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendOtp } from "../../../services/forgotPasswordServices";
import { useTranslation } from "react-i18next";

const CheckEmail = ({ goNext, setParentData }) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("checkEmail.errors.email"))
      .required(t("checkEmail.errors.emailRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (email) => sendOtp(email),
    onSuccess: (res, email) => {
      setParentData((prev) => ({ ...prev, email }));
      console.log("✅ OTP sent successfully:", res);
      goNext();
    },
    onError: (err) => {
      console.error("❌ Error sending OTP:", err);
    },
  });

  const onSubmit = (data) => {
    mutate(data.email);
  };

  return (
    <AuthCard title={t("checkEmail.title")}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <MainInput
          id="email"
          label={t("checkEmail.label")}
          placeholder={t("checkEmail.placeholder")}
          register={register("email")}
          error={errors.email?.message}
        />

        <FormError errorMsg={error?.response?.data?.message} />

        <FormBtn
          title={t("checkEmail.continue")}
          loading={isPending}
        />
      </form>
    </AuthCard>
  );
};

export default CheckEmail;

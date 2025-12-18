import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";

import * as yup from "yup";
import { changeEmail } from "../../../services/verifiedEmailServices";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../../store/profile/profileSlice";

const ChangeEmail = ({ setStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const changeEmailSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("changeEmail.emailInvalid"))
      .required(t("changeEmail.emailRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload) => changeEmail(payload.email),
    onSuccess: () => {
      dispatch(getProfileAct())
        .unwrap()
        .then(() => {
          setStep("otp");
        });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-bold text-center">{t("changeEmail.title")}</p>

      <MainInput
        label={t("changeEmail.newEmail")}
        id="email"
        placeholder={t("changeEmail.placeholder")}
        {...register("email")}
        error={errors.email?.message}
      />

      <FormError errorMsg={error?.response?.data?.message} />

      <FormBtn
        title={
          isPending ? t("changeEmail.loading") : t("changeEmail.changeBtn")
        }
      />

      <p
        className="text-myGreen text-sm text-center font-semibold hover:underline cursor-pointer"
        onClick={() => setStep("otp")}
      >
        {t("changeEmail.backToOtp")}
      </p>
    </form>
  );
};

export default ChangeEmail;

import { useState } from "react";
import OTP from "./section/OTP";
import ChangeEmail from "./section/ChangeEmail";
import { useTranslation } from "react-i18next";
import AuthCard from "../../components/form/AuthCard";

const VerifiedEmail = () => {
  const [step, setStep] = useState("otp");
  const { t } = useTranslation();

  return (
    <section className="pagePadding container">
      <AuthCard title={t("verifyEmailPage.title")}>
        {step === "otp" ? (
          <OTP setStep={setStep} />
        ) : (
          <ChangeEmail setStep={setStep} />
        )}
      </AuthCard>
    </section>
  );
};

export default VerifiedEmail;

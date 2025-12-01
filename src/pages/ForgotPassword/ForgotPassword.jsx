import { useState } from "react";
import CheckEmail from "./sections/CheckEmail";
import ResetPassword from "./sections/ResetPassword";
import StepProgress from "../../components/form/StepProgress";
import OTP from "./sections/OTP";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("ForgotPassword.steps.checkEmail.title"),
      subtitle: t("ForgotPassword.steps.checkEmail.subtitle"),
    },
    {
      title: t("ForgotPassword.steps.enterOTP.title"),
      subtitle: t("ForgotPassword.steps.enterOTP.subtitle"),
    },
    {
      title: t("ForgotPassword.steps.resetPassword.title"),
      subtitle: t("ForgotPassword.steps.resetPassword.subtitle"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [parentData, setParentData] = useState({
    email: "",
    otp: "",
    password: "",
    reset_token: "",
  });

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="container pagePadding space-y-4">
      <StepProgress steps={steps} currentIndex={currentIndex} />

      {currentIndex === 0 && (
        <CheckEmail goNext={handleNext} setParentData={setParentData} />
      )}
      {currentIndex === 1 && (
        <OTP
          goNext={handleNext}
          parentData={parentData}
          setParentData={setParentData}
        />
      )}
      {currentIndex === 2 && (
        <ResetPassword parentData={parentData} setParentData={setParentData} />
      )}
    </section>
  );
};

export default ForgotPassword;

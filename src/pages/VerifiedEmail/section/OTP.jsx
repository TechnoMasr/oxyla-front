import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyEmail } from "../../../services/verifiedEmailServices";
import { useNavigate } from "react-router-dom";
import { getProfileAct } from "../../../store/profile/profileSlice";

const OTP = ({ setStep }) => {
  const { t } = useTranslation();
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);

  const [timer, setTimer] = useState(60);

  // 🔁 نفس الـ Mutation الخاصة بإعادة الإرسال
  const resendMutation = useMutation({
    mutationFn: () => sendOtp(profile?.email),
    onSuccess: () => {
      setTimer(60);
      setOtp(Array(length).fill(""));
      inputsRef.current[0]?.focus();
      setError("");
    },
  });

  // 🚀 تشغيل sendOtp أول ما الصفحة تفتح
  useEffect(() => {
    if (profile?.email) {
      resendMutation.mutate(); // ← تشغيل API أول ما نخش
    }
  }, [profile?.email]);

  // ⏱ العدّاد
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const {
    mutate,
    isPending,
    isError,
    error: apiError,
  } = useMutation({
    mutationFn: ({ code, email }) => verifyEmail({ code, email }),
    onSuccess: () => {
      dispatch(getProfileAct())
        .unwrap()
        .then(() => {
          navigate("/profile", { replace: true });
        });
    },
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      setError("");

      if (value && index < length - 1) {
        setTimeout(() => {
          inputsRef.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) {
      setError(t("otp2.onlyNumbers"));
      return;
    }
    const newOtp = pasted.split("").slice(0, length);
    while (newOtp.length < length) newOtp.push("");
    setOtp(newOtp);
  };

  const handleFocus = (index) => {
    const firstEmptyIndex = otp.findIndex((val) => val === "");
    if (firstEmptyIndex !== -1 && index > firstEmptyIndex) {
      inputsRef.current[firstEmptyIndex]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");

    if (joinedOtp.length !== length) {
      setError(t("otp2.enterAllDigits"));
      return;
    }

    mutate({ code: joinedOtp, email: profile?.email });
  };

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="max-w-sm mx-auto">
        {t("otp2.sentToEmail")}{" "}
        <span className="text-myPurple font-bold">{profile?.email}</span>{" "}
        {/* <span
          className="text-myGreen text-sm hover:underline cursor-pointer"
          onClick={() => setStep("email")}
        >
          {t("otp2.changeEmail")}
        </span> */}
      </p>

      <div className="flex justify-between max-w-sm mx-auto gap-2" dir="ltr">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-myGreen focus:border-myGreen transition-all"
          />
        ))}
      </div>

      {/* ⏳ عرض العدّاد أو زر إعادة الإرسال */}
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-gray-500 text-sm">
            {t("otp2.resendIn")}{" "}
            <span className="font-semibold">{formatTime()}</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => resendMutation.mutate()}
            className="text-myGreen text-sm font-semibold hover:underline cursor-pointer"
          >
            {t("otp2.resendCode")}
          </button>
        )}
      </div>

      <FormError
        errorMsg={
          error ||
          (isError
            ? apiError?.response?.data?.message || t("otp2.invalid")
            : "")
        }
      />

      <FormBtn title={t("otp2.checkBtn")} loading={isPending} />
    </form>
  );
};

export default OTP;

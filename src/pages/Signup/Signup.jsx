import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaMars, FaVenus } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";

import AuthCard from "../../components/form/AuthCard";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";
import { registerUser } from "../../services/authServices";
import PhoneInputComponent from "../../components/form/PhoneInputComponent";
import { getProfileAct } from "../../store/profile/profileSlice";
import { useDispatch } from "react-redux";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
      .test("is-valid-phone", t("signup.phoneInvalid"), (value) => {
        if (!value) return false;
        // إضافة + إذا لم تكن موجودة لتسهيل الفحص
        const formattedValue = value.startsWith("+") ? value : `+${value}`;
        const phoneNumber = parsePhoneNumberFromString(formattedValue);
        return phoneNumber ? phoneNumber.isValid() : false;
      }),
    gender: yup
      .string()
      .oneOf(["male", "female"], t("signup.genderInvalid"))
      .required(t("signup.genderRequired")),
    age: yup
      .number()
      .typeError(t("signup.ageInvalid"))
      .required(t("signup.ageRequired"))
      .min(1, t("signup.ageMin"))
      .max(120, t("signup.ageMax")),
    goal: yup
      .string()
      .required(t("signup.goalRequired"))
      .max(255, t("signup.goalMax")),
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
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const selectedGender = watch("gender");

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
      phone: data.phone,
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
            label={t("signup.phone")}
            id="phone"
            placeholder={t("signup.phone")}
            setValue={setValue}
            error={errors.phone?.message}
          />

          {/* GENDER CARDS */}
          <div className="flex flex-col gap-1 text-start">
            <label className="block w-fit font-semibold mb-1 text-sm capitalize">
              {t("signup.gender")} :
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* MALE CARD */}
              <label
                className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedGender === "male"
                    ? "border-blue-600 bg-blue-50 text-blue-600 font-semibold shadow-sm"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  className="hidden"
                />
                <FaMars className="text-lg" />
                <span>{t("signup.male")}</span>
              </label>

              {/* FEMALE CARD */}
              <label
                className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedGender === "female"
                    ? "border-pink-500 bg-pink-50 text-pink-600 font-semibold shadow-sm"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  value="female"
                  {...register("gender")}
                  className="hidden"
                />
                <FaVenus className="text-lg" />
                <span>{t("signup.female")}</span>
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-600 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>

          {/* AGE */}
          <MainInput
            id="age"
            type="number"
            label={t("signup.age")}
            placeholder={t("signup.age")}
            register={register("age")}
            error={errors.age?.message}
          />

          {/* GOAL */}
          <MainInput
            id="goal"
            label={t("signup.goal")}
            type="textarea"
            placeholder={t("signup.goalPlaceholder")}
            register={register("goal")}
            error={errors.goal?.message}
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

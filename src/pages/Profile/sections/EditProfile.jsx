import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Avatar from "../../../components/common/Avatar";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";
import { updateProfile } from "../../../services/authServices";
import { toast } from "react-toastify";
import EditProfilePageSkeleton from "../../../components/Loading/SkeletonLoading/EditProfilePageSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { addProfile } from "../../../store/profile/profileSlice";
import { FaMars, FaVenus } from "react-icons/fa";

// استيراد مكتبات الهاتف
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// استيراد hook التحقق
import useRequireAuth from "../../../hooks/useRequireAuth";

const EditProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const requireAuth = useRequireAuth();
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <EditProfilePageSkeleton />;

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [goalError, setGoalError] = useState("");
  const [goalOtherError, setGoalOtherError] = useState(""); // State جديد لخطأ Goal Other
  const [generalPasswordError, setGeneralPasswordError] = useState("");

  const [passwordErrors, setPasswordErrors] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [form, setForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    gender: profile?.gender || "",
    age: profile?.age || "",
    goal: Array.isArray(profile?.goal) ? profile.goal : [],
    goal_other: profile?.goal_other || "",
  });

  const [passwords, setPasswords] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        location: profile?.location || "",
        gender: profile?.gender || "",
        age: profile?.age || "",
        goal: Array.isArray(profile?.goal) ? profile.goal : [],
        goal_other: profile?.goal_other || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    // مسح خطأ goal_other عند الكتابة فيه
    if (id === "goal_other" && goalOtherError) {
      setGoalOtherError("");
    }
  };

  // التحكم في اختيار وتحديد الأهداف (Multi-Select)
  const handleGoalToggle = (key) => {
    if (!isEditing) return;
    setForm((prev) => {
      const currentGoals = prev.goal || [];
      const exists = currentGoals.includes(key);
      const updatedGoals = exists
        ? currentGoals.filter((item) => item !== key)
        : [...currentGoals, key];

      return {
        ...prev,
        goal: updatedGoals,
        // مسح هدف other لو اتعملها unselect
        goal_other: updatedGoals.includes("other") ? prev.goal_other : "",
      };
    });
    if (goalError) setGoalError("");
    if (goalOtherError) setGoalOtherError("");
  };

  const handlePhoneChange = (value) => {
    if (!isEditing) return;
    const formattedPhone = value ? `+${value}` : "";
    setForm((prev) => ({ ...prev, phone: formattedPhone }));
    if (phoneError) setPhoneError("");
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswords((prev) => ({ ...prev, [id]: value }));
    if (passwordErrors[id]) {
      setPasswordErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const resetPasswordFields = () => {
    setPasswords({
      current_password: "",
      password: "",
      password_confirmation: "",
    });
    setPasswordErrors({
      current_password: "",
      password: "",
      password_confirmation: "",
    });
    setGeneralPasswordError("");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(t("editProfilePage.profileUpdated"));
      setError("");
      setIsEditing(false);

      const updatedUserData = data;
      dispatch(addProfile(updatedUserData));

      setForm({
        name: updatedUserData?.name || form.name,
        email: updatedUserData?.email || form.email,
        phone: updatedUserData?.phone || form.phone,
        location: updatedUserData?.location || form.location,
        gender: updatedUserData?.gender || form.gender,
        age: updatedUserData?.age || form.age,
        goal: Array.isArray(updatedUserData?.goal)
          ? updatedUserData.goal
          : form.goal,
        goal_other: updatedUserData?.goal_other || "",
      });

      resetPasswordFields();

      const modal = document.getElementById("change_password_modal");
      if (modal) modal.close();
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        t("editProfilePage.errorSomethingWrong");
      setError(msg);
      setGeneralPasswordError(msg);
    },
  });

  const validateProfileForm = () => {
    let isValid = true;

    if (form.phone) {
      const phoneNumber = parsePhoneNumberFromString(form.phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        setPhoneError(t("editProfilePage.validation.invalidPhone"));
        isValid = false;
      } else {
        setPhoneError("");
      }
    }

    // تحقق اختيار الأهداف الرئيسية
    if (!form.goal || form.goal.length === 0) {
      setGoalError(t("signup.goalRequired"));
      isValid = false;
    } else {
      setGoalError("");
    }

    // تحقق اختيار "أخرى" بدون كتابة
    if (form.goal.includes("other") && !form.goal_other?.trim()) {
      setGoalOtherError(t("signup.goalOtherRequired"));
      isValid = false;
    } else {
      setGoalOtherError("");
    }

    return isValid;
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    requireAuth(() => {
      if (!validateProfileForm()) return;

      const payload = {
        ...form,
        ...(!form.goal.includes("other") && { goal_other: undefined }),
      };

      mutate(payload);
    });
  };

  const validatePasswords = () => {
    const { current_password, password, password_confirmation } = passwords;
    const errors = {
      current_password: "",
      password: "",
      password_confirmation: "",
    };
    let isValid = true;

    if (!current_password) {
      errors.current_password = t(
        "editProfilePage.validation.enterCurrentPassword",
      );
      isValid = false;
    }

    if (!password) {
      errors.password = t("editProfilePage.validation.enterNewPassword");
      isValid = false;
    }

    if (!password_confirmation) {
      errors.password_confirmation = t(
        "editProfilePage.validation.enterNewPassword",
      );
      isValid = false;
    } else if (password && password !== password_confirmation) {
      errors.password_confirmation = t(
        "editProfilePage.validation.passwordMismatch",
      );
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    requireAuth(() => {
      setGeneralPasswordError("");
      if (!validatePasswords()) return;

      const payload = {
        ...form,
        ...(!form.goal.includes("other") && { goal_other: undefined }),
        ...passwords,
      };

      mutate(payload);
    });
  };

  const handleEditClick = () => {
    requireAuth(() => {
      setIsEditing((prev) => !prev);
      setPhoneError("");
      setGoalError("");
      setGoalOtherError("");
    });
  };

  const handleOpenPasswordModal = () => {
    requireAuth(() => {
      resetPasswordFields();
      document.getElementById("change_password_modal").showModal();
    });
  };

  const availableGoals = profile?.available_goals || [];
  const isOtherSelected = form.goal?.includes("other");

  return (
    <section className="mt-6 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-6 mb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Avatar name={form?.name} size="lg" />
          <div>
            <h2 className="font-bold text-xl text-stone-800">{form?.name}</h2>
            <p className="text-sm text-stone-500">{form?.email}</p>
          </div>
        </div>

        <button
          type="button"
          className={`py-2 px-5 rounded-lg cursor-pointer text-sm font-semibold transition-all ${
            isEditing
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-myGreen text-white hover:brightness-90"
          }`}
          onClick={handleEditClick}
        >
          {isEditing ? t("editProfilePage.cancel") : t("editProfilePage.edit")}
        </button>
      </div>

      {/* Form البيانات الشخصية */}
      <form onSubmit={handleSubmitProfile} className="space-y-5">
        <div className="grid grid-cols-1 gap-4">
          <MainInput
            id="name"
            type="text"
            label={t("editProfilePage.name")}
            disabled={!isEditing}
            placeholder={t("editProfilePage.name")}
            register={{
              value: form.name,
              onChange: handleChange,
            }}
          />

          <MainInput
            id="email"
            type="text"
            label={t("editProfilePage.email")}
            disabled={!isEditing}
            placeholder="example@mail.com"
            register={{
              value: form.email,
              onChange: handleChange,
            }}
          />

          <div>
            <label className="block w-fit font-semibold mb-1 text-sm capitalize">
              {t("editProfilePage.mobileNumber")} :
            </label>
            <div dir="ltr">
              <PhoneInput
                country={"eg"}
                value={form.phone}
                onChange={handlePhoneChange}
                countryCodeEditable={false}
                disabled={!isEditing}
                inputProps={{
                  id: "phone",
                }}
                containerClass="w-full"
                inputClass={`!w-full !text-sm !h-[38px] !bg-white !outline-none !rounded !transition-all ${
                  phoneError
                    ? "!border-2 !border-red-600"
                    : "!border !border-gray-400 focus:!border-2 focus:!border-myGreen"
                } ${!isEditing ? "!opacity-60 !cursor-not-allowed !bg-gray-100" : ""}`}
                buttonClass={`!border !border-gray-400 !rounded-s ${
                  !isEditing
                    ? "!opacity-60 !cursor-not-allowed !bg-gray-100"
                    : ""
                }`}
              />
            </div>
            {phoneError && (
              <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                {phoneError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 text-start">
            <label className="block w-fit font-semibold mb-1 text-sm capitalize">
              {t("signup.gender")} :
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg transition-all ${
                  form.gender === "male"
                    ? "border-blue-600 bg-blue-50 text-blue-600 font-semibold shadow-sm"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                } ${!isEditing ? "opacity-60 cursor-not-allowed bg-gray-100" : "cursor-pointer"}`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  disabled={!isEditing}
                  checked={form.gender === "male"}
                  onChange={(e) =>
                    isEditing &&
                    setForm((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="hidden"
                />
                <FaMars className="text-lg" />
                <span>{t("signup.male")}</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg transition-all ${
                  form.gender === "female"
                    ? "border-pink-500 bg-pink-50 text-pink-600 font-semibold shadow-sm"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                } ${!isEditing ? "opacity-60 cursor-not-allowed bg-gray-100" : "cursor-pointer"}`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  disabled={!isEditing}
                  checked={form.gender === "female"}
                  onChange={(e) =>
                    isEditing &&
                    setForm((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="hidden"
                />
                <FaVenus className="text-lg" />
                <span>{t("signup.female")}</span>
              </label>
            </div>
          </div>

          <MainInput
            id="age"
            type="number"
            label={t("signup.age")}
            disabled={!isEditing}
            placeholder={t("signup.age")}
            register={{
              value: form.age,
              onChange: handleChange,
            }}
          />

          {/* GOALS MULTI-SELECT SECTION */}
          <div className="flex flex-col gap-2 text-start">
            <label className="block w-fit font-semibold text-sm capitalize">
              {t("signup.goal")} :
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableGoals.map((item) => {
                const isChecked = form.goal?.includes(item.key);
                return (
                  <button
                    type="button"
                    key={item.key}
                    disabled={!isEditing}
                    onClick={() => handleGoalToggle(item.key)}
                    className={`flex items-center justify-center text-center p-2.5 border rounded-lg text-xs font-medium transition-all ${
                      isChecked
                        ? "border-myGreen bg-green-50 text-myGreen font-bold shadow-xs"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    } ${
                      !isEditing
                        ? "opacity-60 cursor-not-allowed bg-gray-100"
                        : "cursor-pointer"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {goalError && (
              <span className="text-red-600 text-sm">{goalError}</span>
            )}
          </div>

          {/* GOAL OTHER (CONDITIONAL TEXTAREA) */}
          {isOtherSelected && (
            <MainInput
              id="goal_other"
              type="textarea"
              label={t("signup.goalOther")}
              disabled={!isEditing}
              placeholder={t("signup.goalPlaceholder")}
              error={goalOtherError}
              register={{
                value: form.goal_other,
                onChange: handleChange,
              }}
            />
          )}

          <MainInput
            id="location"
            type="text"
            label={t("editProfilePage.location")}
            disabled={!isEditing}
            placeholder={t("editProfilePage.location")}
            register={{
              value: form.location,
              onChange: handleChange,
            }}
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          {isEditing && (
            <div>
              <FormBtn
                title={
                  isPending ? "Saving..." : t("editProfilePage.saveChanges")
                }
              />
            </div>
          )}

          <button
            type="button"
            className="py-2 px-4 border border-stone-300 rounded-lg cursor-pointer hover:bg-stone-50 text-sm font-semibold transition-colors"
            onClick={handleOpenPasswordModal}
          >
            {t("editProfilePage.changePassword")}
          </button>
        </div>

        <FormError errorMsg={error} />
      </form>

      {/* Modal تغيير كلمة السر */}
      <dialog id="change_password_modal" className="modal">
        <div className="modal-box max-w-md">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute end-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">
            {t("editProfilePage.changePassword")}
          </h3>

          <form onSubmit={handleSubmitPassword} className="space-y-4">
            <MainInput
              id="current_password"
              type="password"
              label={t("editProfilePage.currentPassword")}
              placeholder="••••••••"
              error={passwordErrors.current_password}
              register={{
                value: passwords.current_password,
                onChange: handlePasswordChange,
              }}
            />

            <MainInput
              id="password"
              type="password"
              label={t("editProfilePage.newPassword")}
              placeholder="••••••••"
              error={passwordErrors.password}
              register={{
                value: passwords.password,
                onChange: handlePasswordChange,
              }}
            />

            <MainInput
              id="password_confirmation"
              type="password"
              label={t("editProfilePage.confirmNewPassword")}
              placeholder="••••••••"
              error={passwordErrors.password_confirmation}
              register={{
                value: passwords.password_confirmation,
                onChange: handlePasswordChange,
              }}
            />

            <FormError errorMsg={generalPasswordError} />

            <div className="modal-action">
              <button
                type="button"
                className="btn bg-red-700 text-white rounded-lg"
                onClick={() =>
                  document.getElementById("change_password_modal").close()
                }
              >
                {t("editProfilePage.cancel")}
              </button>
              <FormBtn
                title={
                  isPending ? "Saving..." : t("editProfilePage.saveChanges")
                }
              />
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
};

export default EditProfile;

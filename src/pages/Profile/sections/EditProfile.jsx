import { useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Avatar from "../../../components/common/Avatar";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { updateProfile } from "../../../services/authServices";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { profile } = useSelector((state) => state.profile);

  const [showPassword, setShowPassword] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (!isEditing) return; // علشان متسمحش بالتعديل لو مش فاتح edit
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      setError("");
      setIsEditing(false); // بعد الحفظ اقفله تاني
      console.log("update data", data);

      setForm((prev) => ({
        ...prev,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        location: data?.location,
        current_password: "",
        password: "",
        password_confirmation: "",
      }));
    },
    onError: (err) => {
      setError(err?.response?.data?.message || "Something went wrong");
    },
  });

  // ⭐ Validation Logic
  const validateForm = () => {
    const { current_password, password, password_confirmation } = form;

    if (current_password) {
      if (!password || !password_confirmation) {
        return "Please enter the new password and confirmation.";
      }
    }

    if (password && !current_password) {
      return "Please enter your current password first.";
    }

    if (password && password !== password_confirmation) {
      return "Password confirmation does not match.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    mutate(form);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">Edit Profile</h2>

      {/* Top section — avatar + edit button */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-2">
          <Avatar name={form?.name} size="lg" />
          <div>
            <p className="font-semibold text-lg">{form?.name}</p>
            <p className="text-sm text-stone-600">{form?.email}</p>
          </div>
        </div>

        <button
          className="py-1 px-4 bg-myGreen text-white rounded-lg cursor-pointer hover:brightness-90"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={!isEditing && "bg-gray-100 pointer-events-none"}
      >
        {/* NAME */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300">
          <label htmlFor="name" className="lg:text-lg font-semibold col-span-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* EMAIL */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300">
          <label
            htmlFor="email"
            className="lg:text-lg font-semibold col-span-2"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* PHONE */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300">
          <label
            htmlFor="phone"
            className="lg:text-lg font-semibold col-span-2"
          >
            Mobile Number
          </label>
          <input
            id="phone"
            type="text"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300">
          <label
            htmlFor="location"
            className="lg:text-lg font-semibold col-span-2"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* CURRENT PASSWORD */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300 relative">
          <label
            htmlFor="current_password"
            className="lg:text-lg font-semibold col-span-2"
          >
            Current Password
          </label>

          <input
            id="current_password"
            type={showPassword.current_password ? "text" : "password"}
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent pr-8"
            value={form.current_password}
            onChange={handleChange}
          />

          {isEditing && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  current_password: !prev.current_password,
                }))
              }
            >
              {showPassword.current_password ? (
                <IoEyeOffOutline />
              ) : (
                <IoEyeOutline />
              )}
            </span>
          )}
        </div>

        {/* NEW PASSWORD */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300 relative">
          <label
            htmlFor="password"
            className="lg:text-lg font-semibold col-span-2"
          >
            New Password
          </label>
          <input
            id="password"
            type={showPassword.password ? "text" : "password"}
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.password}
            onChange={handleChange}
          />
          {isEditing && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
            >
              {showPassword.password ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="grid grid-cols-5 p-2 border-b border-gray-300 relative">
          <label
            htmlFor="password_confirmation"
            className="lg:text-lg font-semibold col-span-2"
          >
            Confirm New Password
          </label>
          <input
            id="password_confirmation"
            type={showPassword.password_confirmation ? "text" : "password"}
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.password_confirmation}
            onChange={handleChange}
          />
          {isEditing && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password_confirmation: !prev.password_confirmation,
                }))
              }
            >
              {showPassword.password_confirmation ? (
                <IoEyeOffOutline />
              ) : (
                <IoEyeOutline />
              )}
            </span>
          )}
        </div>

        {isEditing && (
          <div className="my-6 w-fit">
            <FormBtn title={isPending ? "Saving..." : "Save Changes"} />
          </div>
        )}

        <FormError errorMsg={error} />
      </form>
    </section>
  );
};

export default EditProfile;

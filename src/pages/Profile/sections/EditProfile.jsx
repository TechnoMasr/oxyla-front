import { useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Avatar from "../../../components/common/Avatar";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import { updateProfile } from "../../../services/authServices";

const EditProfile = () => {
  const { profile } = useSelector((state) => state.profile);

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
    onSuccess: () => {
      setError("");
      setIsEditing(false); // بعد الحفظ اقفله تاني
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
          <Avatar name={profile?.name} size="lg" />
          <div>
            <p className="font-semibold text-lg">{profile?.name}</p>
            <p className="text-sm text-stone-600">{profile?.email}</p>
          </div>
        </div>

        {!isEditing && (
          <button
            className="py-1 px-4 bg-myGreen text-white rounded-lg cursor-pointer hover:brightness-90"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label htmlFor="name" className="lg:text-lg font-semibold">
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
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label htmlFor="email" className="lg:text-lg font-semibold">
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
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label htmlFor="phone" className="lg:text-lg font-semibold">
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
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label htmlFor="location" className="lg:text-lg font-semibold">
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
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label
            htmlFor="current_password"
            className="lg:text-lg font-semibold"
          >
            Current Password
          </label>
          <input
            id="current_password"
            type="password"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.current_password}
            onChange={handleChange}
          />
        </div>

        {/* NEW PASSWORD */}
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label htmlFor="password" className="lg:text-lg font-semibold">
            New Password
          </label>
          <input
            id="password"
            type="password"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="grid grid-cols-4 p-2 border-b border-gray-300">
          <label
            htmlFor="password_confirmation"
            className="lg:text-lg font-semibold"
          >
            Confirm New Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            disabled={!isEditing}
            className="col-span-3 border-none outline-0 disabled:bg-transparent"
            value={form.password_confirmation}
            onChange={handleChange}
          />
        </div>

        {isEditing && (
          <div className="mt-6 w-fit">
            <FormBtn title={isPending ? "Saving..." : "Save Changes"} />
          </div>
        )}

        <FormError errorMsg={error} />
      </form>
    </section>
  );
};

export default EditProfile;

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const MainInput = ({
  label,
  icon,
  type = "text",
  options = [],
  error,
  id,
  register,
  placeholder,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const commonInputClasses = `w-full text-sm bg-white outline-none border-none p-2 rounded ring-1 transition-all ${
    isPassword && "pe-8"
  } ${
    error
      ? "ring-red-600 ring-2"
      : "ring-gray-400 focus-within:ring-myGreen focus-within:ring-2"
  } ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`;

  const commonLabel = label && (
    <label
      htmlFor={id}
      className="block w-fit font-semibold mb-1 text-sm capitalize"
    >
      {label} :
    </label>
  );

  const commonError = error && (
    <p className="mt-2 flex items-center gap-1 text-sm text-red-600">{error}</p>
  );

  if (type === "textarea") {
    return (
      <div>
        {commonLabel}
        <textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={`${commonInputClasses} min-h-26 max-h-52`}
          {...register}
        />
        {commonError}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {commonLabel}
        <select
          id={id}
          disabled={disabled}
          {...register}
          className={`select select-ghost select-md outline-0! cursor-pointer ${commonInputClasses}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, idx) => (
            <option key={`${option.value}-${idx}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {commonError}
      </div>
    );
  }

  if (type === "file") {
    return (
      <div>
        {commonLabel}
        <input
          id={id}
          type="file"
          disabled={disabled}
          className={commonInputClasses}
          {...register}
        />
        {commonError}
      </div>
    );
  }

  return (
    <div>
      {commonLabel}
      <div className="relative">
        {icon && (
          <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none text-2xl">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={commonInputClasses}
          {...register}
        />

        {isPassword && (
          <span
            onClick={() => !disabled && setShowPassword(!showPassword)}
            className={`text-neutral-500 cursor-pointer absolute top-1/2 -translate-y-1/2 end-2 text-xl ${
              disabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
      {commonError}
    </div>
  );
};

export default MainInput;

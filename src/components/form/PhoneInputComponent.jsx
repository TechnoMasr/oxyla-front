import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputComponent = ({
  label,
  id,
  error,
  setValue,
  placeholder,
  disabled = false,
  country = "eg",
}) => {
  const [phoneValue, setPhoneValue] = useState("");

  const commonInputClasses = `w-full! text-sm bg-white outline-none border-none p-2 rounded ring-1 transition-all ${
    error
      ? "ring-red-600 ring-2"
      : "ring-gray-400 focus-within:ring-myGreen focus-within:ring-2"
  } ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block w-fit font-semibold mb-1 text-sm capitalize"
        >
          {label} :
        </label>
      )}

      <PhoneInput
        country={country}
        value={phoneValue}
        onChange={(value) => {
          setPhoneValue(value);
          setValue && setValue("phone", "+" + value); // RHF
        }}
        containerClass="w-full" // يعطي الـ wrapper full width
        inputClass={`w-full ${commonInputClasses}`} // يعطي الـ input نفسه full width
        disabled={disabled}
        placeholder={placeholder}
        inputProps={{
          id,
        }}
      />

      {error && (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInputComponent;

import { useTranslation } from "react-i18next";

const FormBtn = ({
  title = "Submit",
  disabled,
  loading,
  onClick = () => {},
  type = "submit",
  margin = true,
}) => {
  const isDisabled = disabled || loading;
  const { t } = useTranslation();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`mainBtn w-full ${margin && "block mx-auto"} ${
        isDisabled ? "!cursor-not-allowed contrast-50" : ""
      }`}
    >
      {loading ? (
        <>
          {t("loading")} ...
          <span className="inline-block w-4 h-4 border-2 border-myBlue-2 border-t-transparent rounded-full animate-spin ms-2"></span>
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default FormBtn;

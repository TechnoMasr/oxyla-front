import { useParams, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isSuccess = status === "success";
  const isFailed = status === "failed";

  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
        {/* Icon */}
        {isSuccess && (
          <FaCheckCircle className="mx-auto text-green-500 text-[90px]" />
        )}

        {isFailed && (
          <FaTimesCircle className="mx-auto text-red-500 text-[90px]" />
        )}

        {!isSuccess && !isFailed && (
          <FaExclamationCircle className="mx-auto text-gray-400 text-[90px]" />
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold">
          {isSuccess && t("payment.success.title")}
          {isFailed && t("payment.failed.title")}
          {!isSuccess && !isFailed && t("payment.unknown.title")}
        </h1>

        {/* Description */}
        <p className="text-gray-600">
          {isSuccess && t("payment.success.description")}
          {isFailed && t("payment.failed.description")}
          {!isSuccess && !isFailed && t("payment.unknown.description")}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          {isFailed && (
            <button
              onClick={() => navigate("/cart")}
              className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
            >
              {t("payment.actions.retry")}
            </button>
          )}

          <button
            onClick={() => navigate("/profile/appointment")}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            {t("payment.actions.orders")}
          </button>

          <button onClick={() => navigate("/")} className="mainBtn">
            {t("payment.actions.home")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;

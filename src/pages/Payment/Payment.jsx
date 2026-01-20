import { useParams, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Payment = () => {
  const { status } = useParams();
  const navigate = useNavigate();

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
          {isSuccess && "تم الدفع بنجاح"}
          {isFailed && "فشلت عملية الدفع"}
          {!isSuccess && !isFailed && "حالة غير معروفة"}
        </h1>

        {/* Description */}
        <p className="text-gray-600">
          {isSuccess && "شكراً لك! تم تأكيد عملية الدفع بنجاح."}
          {isFailed && "حدث خطأ أثناء عملية الدفع، يرجى المحاولة مرة أخرى."}
          {!isSuccess &&
            !isFailed &&
            "الرجاء التأكد من رابط الدفع أو المحاولة لاحقاً."}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center pt-4">
          {isFailed && (
            <button
              onClick={() => navigate("/checkout")}
              className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              إعادة المحاولة
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            الرجوع للرئيسية
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;

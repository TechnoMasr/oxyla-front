import axios from "axios";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Cookies from "js-cookie";
import { store } from "../store/store";

dayjs.extend(utc);
dayjs.extend(timezone);

// ✅ القيم من env
const STATIC_WORD = import.meta.env.VITE_SIGNATURE_STATIC_WORD || "AGORA_2025";
const SECRET_KEY =
  import.meta.env.VITE_SIGNATURE_SECRET || "D9CCAC38146C5B89A32D7C2671EEA";
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ;
const BASE_URL_LOCAL = BASE_URL;

// ✅ توليد nonce فريد
const generateNonce = () =>
  `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

// ✅ حساب التوقيع
const computeSignature = (config, nonce) => {
  const urlObj = new URL(BASE_URL_LOCAL + config.url);
  const urlWithoutProtocol = urlObj.hostname + urlObj.pathname;
  const date = dayjs().tz("Asia/Riyadh").format("YY-MM-DD");
  const method = config.method ? config.method.toUpperCase() : "GET";
  const dataToSign = nonce + STATIC_WORD + urlWithoutProtocol + date + method;

  return {
    signature: CryptoJS.HmacSHA256(dataToSign, SECRET_KEY).toString(
      CryptoJS.enc.Hex
    ),
  };
};

// ✅ إنشاء instance
const api = axios.create({
  baseURL: BASE_URL_LOCAL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
  },
});

// ✅ Interceptor للطلبات
api.interceptors.request.use(
  (config) => {
    // const nonce = generateNonce();
    // const { signature } = computeSignature(config, nonce);

    // // ✅ إضافة التوقيع
    // config.headers["X-Nonce"] = nonce;
    // config.headers["X-Signature"] = signature;

    // ✅ إضافة التوكن لو موجود
    const token = Cookies.get("tokenOx");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const lang = store.getState().language.lang || "en";
    config.headers.lang = lang;

    return config;
  },
  (error) => Promise.reject(error)
);

// // ✅ التحقق من توقيع الاستجابة
// const verifyResponseSignature = (response) => {
//   const responseNonce = response.headers["x-nonce"];
//   const responseSignature = response.headers["x-signature"];

//   if (!responseNonce || !responseSignature) {
//     console.error("❌ الاستجابة غير موقعة أو ناقصة");
//     throw new Error("Response signature headers missing");
//   }

//   const { signature: expectedSignature } = computeSignature(
//     response.config,
//     responseNonce
//   );

//   if (
//     CryptoJS.enc.Hex.parse(expectedSignature).toString() !==
//     CryptoJS.enc.Hex.parse(responseSignature).toString()
//   ) {
//     console.error("❌ التوقيع غير متطابق مع الخادم");
//     throw new Error("Response signature verification failed");
//   }

//   return response;
// };

// // ✅ Interceptor للاستجابة
// api.interceptors.response.use((response) => {
//   if (response && response.status !== 204) {
//     verifyResponseSignature(response);
//   }
//   return response;
// });

export default api;

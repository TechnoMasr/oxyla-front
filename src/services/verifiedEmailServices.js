import api from "./api";

export const sendOtp = async (email) => {
  const { data } = await api.post("/auth/verify/resend-code", { email });
  return data;
};

export const verifyEmail = async (payload) => {
  const { data } = await api.post("/auth/verify-account", payload);
  return data;
};

export const changeEmail = async (email) => {
  const { data } = await api.post("/update-email", { email });
  return data;
};

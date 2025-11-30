import api from "./api";

export const getBookings = async () => {
  const { data } = await api.get("/my-booking");
  return data?.data || [];
};

export const rateBooking = async (payload) => {
  const { data } = await api.post("/rate-booking", payload);
  return data?.data || [];
};

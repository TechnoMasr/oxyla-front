import api from "./api";

export const getBookings = async (page = 1) => {
  const { data } = await api.get("/my-booking", {
    params: { page },
  });
  return data;
};

export const rateBooking = async (payload) => {
  const { data } = await api.post("/rate-booking", payload);
  return data?.data || [];
};

import api from "./api";

export const addToCart = async (payload) => {
  const { data } = await api.post("/cart/add-booking-to-cart", payload);
  return data?.data || [];
};

export const getCart = async () => {
  const { data } = await api.get("/cart/get-booking-cart");
  return data?.data || [];
};

export const editItemInCart = async (payload) => {
  const { data } = await api.post(`/cart/update-booking-cart`, payload);
  return data?.data || [];
};

export const removeFromCart = async (id) => {
  const { data } = await api.post(`/cart/remove-booking-cart`, { id });
  return data?.data || [];
};

export const confirmOrder = async () => {
  const { data } = await api.post(`/cart/confirm-order`);
  return data?.data || [];
};
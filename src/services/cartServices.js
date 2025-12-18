import api from "./api";

export const addToCart = async (payload) => {
  const { data } = await api.post("/cart/add-booking-to-cart", payload);
  return data?.data || [];
};

export const getCart = async () => {
  const { data } = await api.get("/cart/get-booking-cart");
  return data?.data || [];
};

export const getCartCount = async () => {
  const { data } = await api.get("/cart/get-cart-items-count");
  return data.data || 0;
};

export const editItemInCart = async (payload) => {
  const { data } = await api.post(`/cart/update-booking-cart`, payload);
  return data?.data || [];
};

export const removeFromCart = async (id) => {
  const { data } = await api.post(`/cart/remove-booking-cart`, { id });
  return data?.data || [];
};

export const applyCoupon = async (coupon_code) => {
  const { data } = await api.post(`/cart/validate-coupon`, { coupon_code });
  return data?.data || [];
};

export const confirmOrder = async ({ coupon_code }) => {
  const { data } = await api.post(`/cart/confirm-order`, { coupon_code });
  return data?.data || [];
};

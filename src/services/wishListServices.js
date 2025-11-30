import api from "./api";

export const getWishList = async () => {
  const { data } = await api.get("/favorites");
  return data?.data || [];
};

export const toggleWishList = async (payload) => {
  const { data } = await api.post("/favorites", payload);
  return data?.data || [];
};

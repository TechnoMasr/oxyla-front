import api from "./api";

export const getWishList = async (page = 1) => {
  const { data } = await api.get("/favorites", {
    params: { page },
  });
  return data;
};

export const toggleWishList = async (payload) => {
  const { data } = await api.post("/favorites", payload);
  return data?.data || [];
};

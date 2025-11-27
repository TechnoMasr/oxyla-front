import api from "./api";

export const getServices = async (slug) => {
  const { data } = await api.get(`/services`, {
    params: slug !== "all" ? {  slug } : {},
  });
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get(`/services/categories`);
  return data?.data || [];
};

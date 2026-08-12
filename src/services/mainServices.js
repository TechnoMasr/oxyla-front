import api from "./api";

export const getPages = async () => {
  const { data } = await api.get("/pages");
  return data?.data || [];
};

export const getPageContent = async (slug) => {
  const { data } = await api.get(`/page/${slug}`);
  return data?.data || [];
};

export const getGoals = async () => {
  const { data } = await api.get("/goals");
  return data?.data || [];
};
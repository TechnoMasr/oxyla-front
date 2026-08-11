import api from "./api";

export const getCategories = async () => {
  const { data } = await api.get(`/services/categories`);
  return data?.data || [];
};

export const getServices = async (slug, query = "", page = 1) => {
  const params = {};
  if (slug !== "all") params.slug = slug;
  if (query) params.query = query;
  if (page) params.page = page; // إرسال رقم الصفحة للـ API

  const { data } = await api.get(`/services`, { params });
  return data;
};

export const getServiceById = async (id) => {
  const { data } = await api.get(`/services/${id}`);
  return data?.data || {};
};

export const getAvailableTimes = async (id, date) => {
  const { data } = await api.get(
    `/services/${id}/available-times?date=${date}`,
  );
  return data?.data || {};
};

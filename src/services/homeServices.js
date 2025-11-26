import api from "./api";

export const getRelaxationJourneys = async () => {
  const { data } = await api.get("/relaxation-journeys");
  return data?.data || [];
};

export const getWhyChooseUsFeatures = async () => {
  const { data } = await api.get("/why-choose-us-features");
  return data?.data || [];
};

export const getNews = async () => {
  const { data } = await api.get("/news");
  return data?.data || [];
};

export const getPartners = async () => {
  const { data } = await api.get("/partners");
  return data?.data || [];
};

export const getTestimonials = async () => {
  const { data } = await api.get("/testimonials");
  return data?.data || [];
};

export const getServices = async () => {
  const { data } = await api.get("/services");
  return data?.data || [];
};

export const sendNewsletter = async (email) => {
  const { data } = await api.post("/newsletter", { email });
  return data?.data || [];
};

export const sendContactUs = async (formData) => {
  const { data } = await api.post("/contact", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data?.data || [];
};

export const getSettings = async () => {
  const { data } = await api.get("/all-settings");
  return data?.data || [];
};

export const getHome = async () => {
  const { data } = await api.get("/home");
  return data?.data || [];
};

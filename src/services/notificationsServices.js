import api from "./api";

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data?.data || [];
};

export const getUnreadNotifications = async () => {
  const { data } = await api.get("/notifications/unread-count");
  return data?.data || [];
};

export const readNotification = async (id) => {
  const { data } = await api.get(`/notifications/${id}/read`);
  return data?.data || [];
};

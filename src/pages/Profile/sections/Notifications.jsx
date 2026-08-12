import { useState } from "react";
import { BsBell, BsCheckCircle } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadNotifications,
  readNotification,
} from "../../../services/notificationsServices";
import EmptyData from "../../../components/sections/EmptyData";
import NotificationsPageSkeleton from "../../../components/Loading/SkeletonLoading/NotificationsPageSkeleton";

const Notifications = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const { data: unreadNotifications } = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: getUnreadNotifications,
  });

  const readMutation = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unreadNotifications"]);
    },
  });

  if (isLoading) return <NotificationsPageSkeleton />;

  const unreadCount = unreadNotifications?.count || 0;

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications?.filter((n) => n.category === activeTab);

  const handleRead = (id, isRead) => {
    if (!isRead) {
      readMutation.mutate(id);
    }
  };

  return (
    <section className="mt-6">
      {/* Header & Tabs */}

      <div className="w-fit mb-4 flex items-center gap-1 bg-white p-1 rounded-xl border-2 border-myPurple/50 self-start sm:self-auto">
        {["all", "alert", "newsletter"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === tab
                ? "bg-myPurple text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
            }`}
          >
            {t(`notificationsPage.tabs.${tab}`)}
            {tab === "all" && unreadCount > 0 && (
              <span className="text-xs bg-red-100 text-red-600 font-semibold px-2.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications?.map((notification) => {
          const isRead = notification.is_read;

          return (
            <div
              key={notification.id}
              onClick={() => handleRead(notification.id, isRead)}
              className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                isRead
                  ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  : "bg-myPurple/5 border-myPurple/20 border-e-4 border-e-myPurple shadow-sm cursor-pointer hover:bg-myPurple/10"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isRead
                    ? "bg-gray-100 text-gray-500"
                    : "bg-myPurple text-white shadow-md shadow-myPurple/20"
                }`}
              >
                <BsBell className="text-lg" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base font-semibold line-clamp-2 mb-1 ${
                    isRead ? "text-gray-800" : "text-gray-900 font-bold"
                  }`}
                >
                  {notification.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {notification.body}
                </p>

                {/* Actions & Meta */}
                {notification.screen && (
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/profile/${notification.screen}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-myPurple bg-myPurple/10 hover:bg-myPurple hover:text-white px-3 py-1.5 rounded-lg transition-colors duration-200"
                    >
                      {t("notificationsPage.view")}
                    </Link>
                  </div>
                )}

                <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0 mt-2">
                  <IoMdTime className="text-sm" />
                  {notification.created_at}
                </span>
              </div>

              {/* Read/Unread Status Dot */}
              {!isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-myPurple shrink-0 mt-2"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {(!filteredNotifications || filteredNotifications.length === 0) && (
        <div className="py-12">
          <EmptyData text={t("notificationsPage.noNotifications")} />
        </div>
      )}
    </section>
  );
};

export default Notifications;

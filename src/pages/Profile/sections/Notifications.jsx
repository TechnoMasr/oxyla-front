import { useState } from "react";
import { BsBell } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSection from "../../../components/loading/LoadingSection";
import {
  getNotifications,
  getUnreadNotifications,
  readNotification,
} from "../../../services/notificationsServices";

const Notifications = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();

  /** 🟣 جلب كل الإشعارات */
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  /** 🟣 جلب عدد غير المقروء */
  const { data: unreadNotifications } = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: getUnreadNotifications,
  });

  /** 🔥 mutation */
  const readMutation = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unreadNotifications"]);
    },
  });

  if (isLoading) return <LoadingSection />;

  /** 🟣 حساب عدد كل نوع */
  // const counts = {
  //   all: notifications?.length || 0,
  //   alert: notifications?.filter((n) => n.category === "alert").length || 0,
  //   newsletter:
  //     notifications?.filter((n) => n.category === "newsletter").length || 0,
  // };

  /** 🟣 عدد الإشعارات غير المقروءة */
  const unreadCount = unreadNotifications?.count || 0;

  /** 🟣 تبويبات الإشعارات */
  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications?.filter((n) => n.category === activeTab);

  const handleRead = (id) => readMutation.mutate(id);

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">
        {t("notificationsPage.title")}
      </h2>

      {/* ⭐ التبويبات + الأرقام */}
      <div role="tablist" className="tabs tabs-border mb-4 flex gap-2">
        {["all", "alert", "newsletter"].map((tab) => (
          <button
            key={tab}
            role="tab"
            onClick={() => setActiveTab(tab)}
            className={`tab capitalize flex items-center gap-2 ${
              activeTab === tab ? "tab-active text-myPurple font-semibold" : ""
            }`}
          >
            {t(`notificationsPage.tabs.${tab}`)}

            {/* 🔥 إظهار عدد كل تبويب */}
            {/* <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs">
              {counts[tab]}
            </span> */}

            {/* 🔥 عدد غير المقروء فقط على تبويب All */}
            {tab === "all" && unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 🟣 عرض الإشعارات */}
      {filteredNotifications?.map((notification) => (
        <div
          onClick={() => handleRead(notification.id)}
          key={notification.id}
          className={`flex items-start gap-2 p-4 mb-2 border border-gray-200 rounded-xl transition-colors duration-200 ${
            notification.is_read
              ? "bg-white hover:bg-gray-100"
              : "bg-myPurple/20 hover:bg-myPurple/30"
          }`}
        >
          <span
            className={`text-xl w-8 h-8 flex items-center justify-center rounded-full ${
              notification.is_read
                ? "bg-gray-200 text-black"
                : "bg-myPurple text-white"
            }`}
          >
            <BsBell />
          </span>

          <div className="flex-1">
            <h3 className="text-xl font-semibold">{notification.title}</h3>
            <p className="text-sm text-gray-700">{notification.body}</p>

            {notification.screen && (
              <Link
                to={`/profile/${notification.screen}`}
                className="mainBtn my-1 text-xs w-fit py-1 px-2 inline-block"
              >
                {t("notificationsPage.view")}
              </Link>
            )}

            <p className="text-xs text-gray-800 flex items-center gap-1">
              <IoMdTime />
              {notification.created_at}
            </p>
          </div>
        </div>
      ))}

      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          {t("notificationsPage.noNotifications")}
        </p>
      )}
    </section>
  );
};

export default Notifications;

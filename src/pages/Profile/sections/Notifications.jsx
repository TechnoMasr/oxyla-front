import { useState } from "react";
import { BsBell } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const notificationsList = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: t("notificationsPage.newMessage"),
    description: t("notificationsPage.messageFrom"),
    date: "2022-01-01",
    status: index % 2 === 0 ? "Unread" : "Read",
    link:
      index % 2 !== 0
        ? {
            url: "/",
            name: t("notificationsPage.viewLink"),
          }
        : null,
    type: index % 2 === 0 ? "newsletter" : "alert",
  }));

  const filteredNotifications =
    activeTab === "all"
      ? notificationsList
      : notificationsList.filter((n) => n.type === activeTab);

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">
        {t("notificationsPage.title")}
      </h2>

      {/* 🔹 التبويبات */}
      <div role="tablist" className="tabs tabs-border mb-4">
        {["all", "alert", "newsletter"].map((tab) => (
          <button
            key={tab}
            role="tab"
            onClick={() => setActiveTab(tab)}
            className={`tab capitalize ${
              activeTab === tab ? "tab-active text-myPurple font-semibold" : ""
            }`}
          >
            {t(`notificationsPage.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* 🔹 عرض الإشعارات المفلترة */}
      {filteredNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-2 p-4 mb-2 border border-gray-200 rounded-xl transition-colors duration-200 ${
            notification.status === "Read"
              ? "bg-white hover:bg-gray-100"
              : "bg-myPurple/20 hover:bg-myPurple/30"
          }`}
        >
          <span
            className={`text-xl w-8 h-8 flex items-center justify-center rounded-full ${
              notification.status === "Read"
                ? "bg-gray-200 text-black"
                : "bg-myPurple text-white"
            }`}
          >
            <BsBell />
          </span>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p className="text-sm text-gray-700">{notification.description}</p>

            {notification.link && (
              <Link
                to={notification.link.url}
                className="mainBtn my-1 text-xs w-fit py-1 px-2 inline-block"
              >
                {notification.link.name}
              </Link>
            )}

            <p className="text-xs text-gray-600 flex items-center gap-1">
              <IoMdTime />
              {notification.date}
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

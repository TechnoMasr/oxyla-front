import { useTranslation } from "react-i18next";
import { HiOutlineFolderOpen } from "react-icons/hi";

const EmptyData = ({ text }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 h-60">
      <HiOutlineFolderOpen className="text-[150px] text-myBlue animate-pulse" />

      <p className="text-center text-lg font-semibold">{text || t("noData")}</p>
    </div>
  );
};

export default EmptyData;

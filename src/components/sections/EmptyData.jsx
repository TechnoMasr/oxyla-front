import emptyIcon from "../../assets/icons/folder-empty@3x.png";

const EmptyData = ({ page = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-4 ${
        page ? "h-screen" : ""
      }`}
    >
      <img src={emptyIcon} alt="No Data" className="w-32 lg:w-40" />

      <p className="text-center text-gray-600 text-lg lg:text-2xl font-semibold">
        No Data Available
      </p>
    </div>
  );
};

export default EmptyData;

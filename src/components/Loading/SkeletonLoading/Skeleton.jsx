const Skeleton = ({
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
}) => {
  return (
    <div
      className={`
        animate-pulse
        bg-gray-300/80
        ${width}
        ${height}
        ${rounded}
        ${className}
      `}
    />
  );
};

export default Skeleton;

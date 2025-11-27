export default function Avatar({ name, img, size = "md", active = false }) {
  const sizes = {
    sm: "w-6 h-6 lg:w-8 lg:h-8 text-sm", // 32px
    md: "w-10 h-10 lg:w-12 lg:h-12 text-lg", // 48px
    lg: "w-12 h-12 lg:w-16 lg:h-16 text-2xl", // 64px
  };

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white
      bg-gradient-to-bl from-myGreen via-myBlue to-myPurple overflow-hidden ${sizes[size]}`}
    >
      {img ? (
        <img src={img} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

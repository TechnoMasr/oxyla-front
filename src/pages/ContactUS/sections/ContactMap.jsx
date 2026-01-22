const ContactMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <section>
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>
    </section>
  );
};

export default ContactMap;

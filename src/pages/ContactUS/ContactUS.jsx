import { useSelector } from "react-redux";
import ContactForm from "./sections/ContactForm";
import ContactMap from "./sections/ContactMap";

const ContactUS = () => {
  const { setting } = useSelector((state) => state.setting);
  const latitude = setting?.latitude;
  const longitude = setting?.longitude;

  const hasMap = latitude && longitude;

  return (
    <article
      className={`container pagePadding grid gap-8 lg:gap-16 ${
        hasMap
          ? "grid-cols-1 lg:grid-cols-2"
          : "grid-cols-1 justify-items-center"
      }`}
    >
      <div className={`${hasMap ? "" : "w-full max-w-2xl"}`}>
        <ContactForm />
      </div>

      {hasMap && <ContactMap latitude={latitude} longitude={longitude} />}
    </article>
  );
};

export default ContactUS;

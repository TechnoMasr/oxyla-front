import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// لتعديل أيقونة الماركر الافتراضية في Leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ContactMap = ({ latitude, longitude }) => {
  return (
    <section>
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[latitude, longitude]} icon={markerIcon}>
            <Popup>موقعنا هنا</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactMap;

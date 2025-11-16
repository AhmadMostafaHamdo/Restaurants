import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Title from "./common/title/Title";

// حل مشكلة أيقونات الـ marker الأساسية
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// بيانات المطاعم
const restaurants = [
  {
    id: 1,
    name: "مطعم دجاجتي",
    cuisine: "أكلات عربية",
    location: [35.54092852440536, 35.795137958659396],
    address: "حي العليا، الرياض",
    rating: 4.5,
  },
  {
    id: 2,
    name: "لفاح",
    cuisine: "إيطالي",
    location: [35.52224631467042, 35.79129053536927],
    address: "حي النخيل، الرياض",
    rating: 4.2,
  },
  {
    id: 3,
    name: "اليسار",
    cuisine: "مأكولات بحرية",
    location: [35.65394300330553, 35.77572998933654],
    address: "حي السفارات، الرياض",
    rating: 4.7,
  },
];

// مكون لضبط حدود الخريطة لتشمل كل المواقع مع تقييد أقصى تكبير
function FitBounds({ locations }) {
  const map = useMap();

  React.useEffect(() => {
    if (!locations.length) return;
    const bounds = L.latLngBounds(locations);

    // نجرب fitBounds لكن مع تقييد أقصى zoom (تكبير) مثلاً 15
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [locations, map]);

  return null;
}

const RestaurantMap = () => {
  const restaurantIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/167/167707.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      }),
    []
  );

  const locations = restaurants.map((r) => r.location);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Title title="map for our resturants" />
      <MapContainer
        center={locations[0]} // نركز على أول موقع مؤقتًا
        zoom={13} // تكبير معقول لعرض المواقع المتقاربة
        style={{
          height: "500px",
          width: "80%",
          margin: "0 auto",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          zIndex: "-1",
        }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FitBounds locations={locations} />

        {restaurants.map(({ id, location, name, cuisine, rating, address }) => (
          <Marker key={id} position={location} icon={restaurantIcon}>
            <Popup>
              <div style={{ textAlign: "right", direction: "rtl" }}>
                <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>{name}</h3>
                <p style={{ margin: "5px 0" }}>
                  <strong>نوع المطبخ:</strong> {cuisine}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>التقييم:</strong> {rating} ⭐
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>العنوان:</strong> {address}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;

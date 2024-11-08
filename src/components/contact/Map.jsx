import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ location }) {
  return (
    <div className="map-container">
      <MapContainer 
        center={[location.lat, location.lng]} 
        zoom={15} 
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            <strong>HealthyLife Clinic</strong><br />
            {location.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map; 
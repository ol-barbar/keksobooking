import { filledArray } from './data.js';
import { filledCard } from './card.js';
import { getDisabled } from './form.js';

let address = document.querySelector('input[name="address"]');
let mapLoad = false
let latMainMarker = 35.67500;
let lngMainMarker = 139.75000;

let flag = document.querySelector('.leaflet-attribution-flag')
flag.remove()

const map = L.map('map-canvas').on('load', () => {
  mapLoad = true
})
  .setView({
    lat: 35.65000,
    lng: 139.70000,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarcker = L.marker(
  {
    lat: latMainMarker,
    lng: lngMainMarker,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarcker.addTo(map);

address.value = mainMarcker._latlng.lat.toFixed(5) + ', ' + mainMarcker._latlng.lng.toFixed(5);

let trackingMarcker = mainMarcker.on('moveend', (evt) => {
  let valueLatLng = evt.target.getLatLng();
  address.value = valueLatLng.lat.toFixed(5) + ', ' + valueLatLng.lng.toFixed(5)
});

const regularPinMarcker = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

filledArray.forEach((item) => {
  const regularMarcker = L.marker(
    {
      lat: item.location.locationX,
      lng: item.location.locationY,
    },
    {
      icon: regularPinMarcker,
    },
  );
  regularMarcker.addTo(map).bindPopup(filledCard(item));
});

getDisabled(mapLoad)

export {trackingMarcker}

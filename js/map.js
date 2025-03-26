/* global L:readonly */
// import L from 'leaflet';
import { filledCard } from './card.js';
import { getDisabled } from './form.js';
import { createData } from './server.js';

let address = document.querySelector('input[name="address"]');
let mapLoad = false
let latMainMarker = 35.67500;
let lngMainMarker = 139.75000;

const map = L.map('map-canvas').on('load', () => {
  mapLoad = true
})
  .setView({
    lat: 35.67000,
    lng: 139.75000,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

let flag = document.querySelector('.leaflet-attribution-flag')
flag.remove()

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

// Для объединения меток в группу
const markerGroup = L.layerGroup().addTo(map);

const regularPinMarcker = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Получение массива объектов с сервера и отрисовка

let cardArray = []

let addMarcker = (array) => {
  array.slice(0, 10).forEach((item) => {
  // data.forEach((item) => {
    const regularMarcker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon: regularPinMarcker,
      },
    );
    regularMarcker.addTo(markerGroup).bindPopup(filledCard(item));
  });
};

let clearMap = () => {
  markerGroup.clearLayers()
}

const dataArray = createData(
  (data) => {
    cardArray = data
    addMarcker(data)
  },
);

dataArray();

getDisabled(mapLoad)

export {trackingMarcker, addMarcker, cardArray, clearMap}

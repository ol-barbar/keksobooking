/* global _:readonly */
import { addMarcker, cardArray, clearMap } from './map.js';

let mapFilters = document.querySelector('.map__filters');
let housingType = mapFilters.querySelector('#housing-type');
let housingPrice = mapFilters.querySelector('#housing-price');
let housingRooms = mapFilters.querySelector('#housing-rooms');
let housingGuests = mapFilters.querySelector('#housing-guests');
let housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

const DEFAULT_VALUE = 'any'
const RERENDER_DELAY = 500

let priceOption = {
  low: {
    min: 0,
    max : 10000,
  },
  middle: {
    min: 10000,
    max : 50000,
  },
  high: {
    min: 50000,
    max : Infinity,
  }}

let getTypeFilter = (data) => housingType.value === DEFAULT_VALUE || housingType.value === data.offer.type
let getPriceFilter = (data) => housingPrice.value === DEFAULT_VALUE || (data.offer.price >= priceOption[housingPrice.value].min && data.offer.price <= priceOption[housingPrice.value].max)
let getRoomsFilter = (data) => housingRooms.value === DEFAULT_VALUE || parseInt(housingRooms.value) === data.offer.rooms
let getGuestsFilter = (data) => housingGuests.value === DEFAULT_VALUE || parseInt(housingGuests.value) === data.offer.guests

let getFeaturesFilter = (data) => Array.from(housingFeatures).every((feature) => {
  if (!feature.checked) {
    return true
  }
  if (!data.offer.features) {
    return false
  }
  return data.offer.features.includes(feature.value);
})

let getFilters = (cards) => {
  let newData = []
  cards.forEach((item) => {
    if (getTypeFilter(item) && getRoomsFilter(item) && getGuestsFilter(item) && getPriceFilter(item) && getFeaturesFilter(item)) {
      newData.push(item)
    }
  })
  return newData
}

let renderingMapFilters = () => {
  clearMap()
  addMarcker(getFilters(cardArray))
}

mapFilters.addEventListener('change', _.debounce(() => renderingMapFilters(), RERENDER_DELAY))

export {}

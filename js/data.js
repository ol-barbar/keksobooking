import { getRandom, getRandomArray } from './util.js';

const QUANTITY_COUNT = 10;

const AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png','img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png','img/avatars/user07.png', 'img/avatars/user08.png', 'img/avatars/user09.png', 'img/avatars/user10.png']

const TITLE = ['Villa Domina', '7Seasons Apartments Budapest', 'RAMBLA BEACH Barcelonastuff Apartments',  'Numa I Vita Apartments', 'Oriente Palace Apartments', 'Downtown Synagogue', 'Cheval Three Quays at The Tower of London', 'P&J Luxury Apartments', 'Aparthotel Stare Miasto', 'Leman Locke'];

const DESCRIPTION = ['Villa Domina is located in Split, just a 5-minute walk from the UNESCO-protected Diocletian’s Palace', 'Featuring a 24-hour reception, the 7Seasons Apartments offers you spacious 1- to 3-bedroom apartments in the heart of Budapest, only 100 metres from Deak Ferenc tér, which is a major public transport hub','Featuring free Wi-Fi, RAMBLA BEACH Barcelonastuff Apartments are located in different locations around Barcelona’s Poblenou district, within a 5-minute walk of the beach','Situated within 1 km of Convent of San Marco in Florence, Numa I Vita Apartments features accommodation with free WiFi, a seating area, a flat-screen TV and a kitchenette','Set in Madrid City Centre, just a 1-minute walk from the Royal Palace and 400 metres from Plaza Mayor Square, Oriente Palace offers apartments and rooms with free WiFi','Situated in the centre of Budapest, 300 metres from Dohany Street Synagogue, the historic Downtown Synagogue features accommodation with free WiFi and a terrace','Located next to the Tower of London, and overlooking the River Thames, Cheval Three Quays offers modern apartments with free Wi-Fi, and an on-site fitness centre','Attractively set in Kraków, P&J Luxury Apartments features a continental breakfast and free WiFi','Aparthotel Stare Miasto is situated in the very centre of Kraków’s Old Town, just 120 metres from the Main Market Square','Whether you are in the City of London for a night, a week or a month, make yourself at home at Leman Locke, all within walking distance of Liverpool Street']

let PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

const TYPE = ['palace', 'flat', 'house', 'hotel', 'bungalow']

const FEATURES = ['wifi', 'parking', 'washer', 'elevator', 'conditioner', 'dishwasher']

const CHECKIN = ['12:00', '13:00', '14:00']

const CHECKOUT = ['12:00', '13:00', '14:00']

let minPrice = 500
let maxPrice = 5000

let minRooms = 1
let maxRooms = 5

let minGuests = 1
let maxGuests = 10

let minLocationX = 35.65000
let maxLocationX = 35.70000
let minLocationY = 139.70000
let maxLocationY = 139.80000

let getObject = () => {
  return {
    author: {
    },
    offer: {
    },
    location: {
    }}
}

// Создание нового массива, заполненного данными из getObject с количеством элементов равным QUANTITY_COUNT
let filledArray = new Array(QUANTITY_COUNT).fill(null).map(() => getObject());

// Цикл проходится по каждому элементу массива filledArray и заполняет указанными данными
for (let i in filledArray) {
  filledArray[i].location.locationX = getRandom(minLocationX, maxLocationX, 5);
  filledArray[i].location.locationY = getRandom(minLocationY, maxLocationY, 5);
  filledArray[i].author.avatar = AVATAR[i];
  filledArray[i].offer.title = TITLE[i];
  filledArray[i].offer.addres = filledArray[i].location.locationX+', '+filledArray[i].location.locationY;
  filledArray[i].offer.price = getRandom(minPrice, maxPrice, 0);
  filledArray[i].offer.type = TYPE[getRandom(0, TYPE.length-1, 0)];
  filledArray[i].offer.rooms = getRandom(minRooms, maxRooms, 0);
  filledArray[i].offer.guests = getRandom(minGuests, maxGuests, 0);
  filledArray[i].offer.checkin = CHECKIN[getRandom(0, CHECKIN.length-1, 0)];
  filledArray[i].offer.checkout = CHECKOUT[getRandom(0, CHECKOUT.length-1, 0)];
  filledArray[i].offer.features = getRandomArray(FEATURES);
  filledArray[i].offer.description = DESCRIPTION[i];
  filledArray[i].offer.photos = getRandomArray(PHOTOS);
}


export {filledArray}

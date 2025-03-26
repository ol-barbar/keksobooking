let template = document.querySelector('#card').content;
let popup = template.querySelector('.popup');

// Функция заполнения карточек данными из сгенерированного массива, клонируется шаблон, заполняется данными и вставляется в конец родителя
// Для типа жилья сопостовляет данные массива и что нужно вставить
// Для features проходится по шаблону с конца, для каждого элемента отделяет стандартную часть, сравнивает оставшуюся часть с данными массива
//    и, если таких данных в массиве нет, то удаляет
// Для фотографий жилья вставляет ссылку на изображение из первого элемента массива и, если длина массива больше 1,
//    клонирует элемент, вставляет ссылку и вставляет клона в конец
let filledCard = (someArray) => {
  let newCard = popup.cloneNode(true);
  let imgCard = newCard.querySelector('.popup__avatar');
  let titleCard = newCard.querySelector('.popup__title');
  let addressCard = newCard.querySelector('.popup__text--address');
  let priceCard = newCard.querySelector('.popup__text--price');
  let typeCard = newCard.querySelector('.popup__type');
  let capacityCard = newCard.querySelector('.popup__text--capacity');
  let timeCard = newCard.querySelector('.popup__text--time');
  let featuresCard = newCard.querySelector('.popup__features');
  let descriptionCard = newCard.querySelector('.popup__description');
  let photosCard = newCard.querySelector('.popup__photos');

  imgCard.src = someArray.author.avatar;
  titleCard.textContent = someArray.offer.title;
  addressCard.textContent = someArray.offer.addres;
  priceCard.innerHTML = (someArray.offer.price + ' <span>₽/ночь</span>')  || '';
  switch (someArray.offer.type) {
    case 'flat':
      typeCard.textContent = 'Квартира';
      break;
    case 'bungalow':
      typeCard.textContent = 'Бунгало';
      break;
    case 'house':
      typeCard.textContent = 'Дом';
      break;
    case 'palace':
      typeCard.textContent = 'Дворец';
      break;
    case 'hotel':
      typeCard.textContent = 'Отель';
      break;
    default: '';
  }
  capacityCard.textContent = (someArray.offer.rooms + ' комнаты для ' + someArray.offer.guests + ' гостей') || '';
  timeCard.textContent = ('Заезд после ' + someArray.offer.checkin + ', выезд до ' + someArray.offer.checkout) || '';
  if (!someArray.offer.features) {
    featuresCard.remove()
  } else {
    for (let i=featuresCard.children.length-1; i>=0; i--) {
      let featuresItem = featuresCard.children[i].classList.value.split('popup__feature popup__feature--')[1];
      if (!someArray.offer.features.includes(featuresItem)) {
        featuresCard.removeChild(featuresCard.children[i])
      }
    }
  }

  descriptionCard.textContent = someArray.offer.description;
  if (!someArray.offer.photos) {
    photosCard.remove()
  } else {
    photosCard.querySelector('.popup__photo').src = someArray.offer.photos[0]
    if (someArray.offer.photos.length > 1) {
      let photo = photosCard.querySelector('.popup__photo');
      for (let i=1; i<someArray.offer.photos.length; i++) {
        let newPhoto = photo.cloneNode(true);
        newPhoto.src = someArray.offer.photos[i];
        photosCard.appendChild(newPhoto);
      }
    }
  }
  // mapCanvas.appendChild(newCard)
  return newCard
}

export {filledCard}

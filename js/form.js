let form = document.querySelector('.ad-form')
let mapForm = document.querySelector('.map__filters')
let price = document.querySelector('input[name="price"]');
let typeList = document.querySelector('#type');
let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');
let roomNumber = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');
let title = form.querySelector('input[name="title"]');
let avatarLoad =  form.querySelector('input[name="avatar"]');
let avatarPreview =  form.querySelector('.ad-form-header__preview');
let avatarPreviewImg =  avatarPreview.querySelector('img');
let photoLoad =  form.querySelector('input[name="images"]');
let photoPreview =  form.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let getDisabled = (mapStatus) => {
  if (!mapStatus){
    form.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
    for (let child of form.children) {
      child.setAttribute('disabled', '')
    }
    for (let child of mapForm.children) {
      child.setAttribute('disabled', '')
    }
  } else {
    form.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
    for (let child of form.children) {
      child.removeAttribute('disabled', '')
    }
    for (let child of mapForm.children) {
      child.removeAttribute('disabled', '')
    }
  }
}

typeList.addEventListener('change', function() {
  if (typeList.value === 'bungalow') {
    price.placeholder = 0;
  } else if (typeList.value === 'flat') {
    price.placeholder = 1000;
  } else if (typeList.value === 'hotel') {
    price.placeholder = 3000;
  } else if (typeList.value === 'house') {
    price.placeholder = 5000;
  } else if (typeList.value === 'palace') {
    price.placeholder = 10000;
  }
})

timeIn.addEventListener('change', function() {
  timeOut.value = timeIn.value
})

timeOut.addEventListener('change', function() {
  timeIn.value = timeOut.value
})

roomNumber.addEventListener('change', function() {
  let roomNumberOption = Number(roomNumber.value);
  for (let child of capacity.children) {
    child.removeAttribute('disabled', '')
    let childValueNumber = Number(child.value)
    if (childValueNumber === 0) {
      child.setAttribute('disabled', '');
    }
    if (childValueNumber > roomNumberOption) {
      child.setAttribute('disabled', '');
    }
    if (roomNumberOption === 100) {
      child.setAttribute('disabled', '');
      if (childValueNumber === 0) {
        child.removeAttribute('disabled', '')
      }
    }
  }
})

// const MIN_TITLE_LENGTH = 30;
// const MAX_TITLE_LENGTH = 100;

// title.addEventListener('input', () => {
//   const valueLength = title.value.length;

//   if (valueLength < MIN_TITLE_LENGTH) {
//     title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
//     // console.log('litle')
//   } else if (valueLength > MAX_TITLE_LENGTH) {
//     title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
//   } else {
//     title.setCustomValidity('');
//   }
//   title.reportValidity();
// });

title.addEventListener('invalid', () => {
  if (title.validity.tooShort) {
    title.setCustomValidity('В заголовке должно быть минимум 30 символов');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('В заголовке должно быть максимум 100 символов');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное для заполнения поле');
  } else {
    title.setCustomValidity('');
  }
})

avatarLoad.addEventListener('change', () => {
  let file = avatarLoad.files[0]
  let fileName = file.name.toLowerCase()
  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it)
  })
  if (matches) {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      avatarPreviewImg.src = reader.result;
    })
    reader.readAsDataURL(file);
  }
})

photoLoad.addEventListener('change', () => {
  let file = photoLoad.files[0]
  let fileName = file.name.toLowerCase()
  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it)
  })
  if (matches) {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      let preview = document.createElement('img')
      preview.style.width = '100%'
      preview.style.height = '100%'
      preview.src = reader.result
      photoPreview.appendChild(preview)

    })
    reader.readAsDataURL(file);
  }
})

export {getDisabled}

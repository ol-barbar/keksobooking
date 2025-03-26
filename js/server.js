let url = 'https://23.javascript.htmlacademy.pro/keksobooking/data';
let ALERT_SHOW_TIME = 5000;

// const createData = (onSuccess, onError) => () => {
const createData = (onSuccess) => () => {
  fetch(url,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        // emptyArray = response.json()
        return response.json();

      }
      // console.log('hello there')
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
      // onError(err);
      showAlert('Ошибка загрузки данных');
    });
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {createData, showAlert}

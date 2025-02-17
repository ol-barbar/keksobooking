// Функция для поиска рандомного числа в указанном диапазоне с заданным количеством цифр после запятой
const getRandom = (min, max, precision) => { 
    if (min>=max || min<0 || max<0) {
        alert('Некорректный диапазон');
        return -1;
    }
    let randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(precision);
}

// Функция для создания массива с рандомной длинной (от 1 и не больше длины указанного массива) и 
// неповторяющимися рандомными данными из указанного массива
const getRandomArray = (usedArray) => {
    let lengthOfUsedArray = usedArray.length;
    let newArray = [];
    let lengthOfNewArray = getRandom(1, lengthOfUsedArray, 0);

    while (newArray.length<lengthOfNewArray) {
        let randomIndex = getRandom(0, lengthOfUsedArray-1, 0);
        let valueOfUsedArray = usedArray[randomIndex];
        if (!newArray.includes(valueOfUsedArray)) {
            newArray.push(valueOfUsedArray)
        }
    }
    return newArray
}

export { getRandom, getRandomArray }
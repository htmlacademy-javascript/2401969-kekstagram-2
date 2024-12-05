// Проверка на максимальную длину строки

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('abracadabra', 15);

// Проверка на палиндром с использованием цикла

const checkPalindrom = (string) => {
  const normilizedString = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = normilizedString.length - 1; i >= 0; i--) {
    reverseString += normilizedString[i];
  }
  return normilizedString === reverseString;
};

checkPalindrom('Аргентина манит негра');

// Проверка на палиндром с использований методов объектов

const isPalindrom = (string) => {
  const normilizedString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = normilizedString.split('').reverse().join('');
  return normilizedString === reverseString;
};

isPalindrom('Кекс');

// Извлечение чисел из строки с использованием цикла

const isNumber = (string) => {
  const normilizedString = string.toString().replaceAll(' ', '');
  let resultString = '';
  for (let i = 0; i < normilizedString.length; i++) {
    if (!isNaN(normilizedString[i])) {
      resultString += normilizedString[i];
    }
  }
  return parseInt(resultString, 10);
};

isNumber('1 литр рома на 1,5 литра колы');

// Извлечение чисел из строки через преобразование строки в объект

const extractNumber = (string) => {
  const normilizedString = string.toString().split('');
  let resultString = '';
  for (let i = 0; i < normilizedString.length; i++) {
    if (!isNaN(normilizedString[i]) && normilizedString[i] !== ' ') {
      resultString += normilizedString[i];
    }
  }
  return parseInt(resultString, 10);
};

extractNumber('2,5 грамма протеина на 1 кг массы тела');

// Определяем рандомное значение

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Проверяем его на уникальность (возвращаем рандомное значение, ранее не использованое в блоке)

const getRandomUniqueInteger = (min, max) => {
  const uniqueIntArr = [];
  return () => {
    while (uniqueIntArr.length < max - min + 1) {
      const randomInt = getRandomInteger(min, max);
      if (!uniqueIntArr.includes(randomInt)) {
        uniqueIntArr.push(randomInt);
        return randomInt;
      }
    }
  };
};

// Получаем рандомный элемент любого массива

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export {
  getRandomInteger,
  checkStringLength,
  getRandomUniqueInteger,
  getRandomArrayElement,
};

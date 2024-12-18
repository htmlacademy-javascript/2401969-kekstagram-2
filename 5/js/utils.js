// Проверка на максимальную длину строки

const checkStringLength = (string, maxLength) => string.length <= maxLength;

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

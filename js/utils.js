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

// Проверяем является ли клавиша "Escape"

const isEscKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const randomSort = () => Math.random() - 0.5;

export {
  getRandomInteger,
  checkStringLength,
  getRandomUniqueInteger,
  getRandomArrayElement,
  isEscKey,
  debounce,
  randomSort,
};

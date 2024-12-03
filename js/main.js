// Массив описаний

const DESCRIPTIONS = [
  'Красивый пейзаж с горами и озером',
  'Маленькая девочка играет с собакой',
  'Группа друзей весело проводит время на пляже',
  'Старинное здание с готической архитектурой',
  'Цветущие вишневые деревья в весеннем саду',
  'Спортсмен бежит по беговой дорожке',
  'Семья отдыхает на природе, пикник',
  'Величественный водопад в лесу',
  'Кошка спит, свернувшись клубочком',
  'Люди гуляют по оживленной городской улице',
  'Закат над морем, отражение солнца в воде',
  'Ребенок рисует красками на бумаге',
  'Велосипедист едет по велодорожке в парке',
  'Старинный замок на фоне гор',
  'Поле с цветущими подсолнухами',
  'Женщина фотографирует на камеру',
  'Дети играют в песочнице',
  'Лодка плывет по спокойному озеру',
  'Птица парит в небе',
  'Люди наслаждаются прогулкой по осеннему лесу',
  'Красивый букет цветов в вазе',
  'Горы с заснеженными вершинами',
  'Кошка сидит на окне и смотрит на улицу',
  'Люди катаются на коньках на замерзшем озере',
  'Ребенок играет с игрушечными машинками',
];

//Массив комментариев

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Массив авторов комментариев

const NAMES = [
  'Анна',
  'Михаил',
  'Екатерина',
  'Александр',
  'Мария',
  'Дмитрий',
  'Ольга',
  'Виктор',
];

// Определяем рандомное значение

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Проверяем его на уникальность (возвращаем рандомное значение, ранее не использованое в блоке)

const getRandomUniqueInteger = (min, max) => {
  const uniqueIntArr = [];
  return function () {
    while (uniqueIntArr.length < max - min + 1) {
      const randomInt = getRandomInteger(min, max);
      if (!uniqueIntArr.includes(randomInt)) {
        uniqueIntArr.push(randomInt);
        return randomInt;
      }
    }
  };
};

// Получаем url фото

const createPhotoUrl = (index) => `photos/${index}.jpeg`;

// Получаем рандомный индекс элемента любого массива

const getRandomArrayIndex = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

// Задаём диапазон кол-ва лайков

const LikesRange = {
  min: 1,
  max: 200,
};

// Задаём максимальное кол-во комментов

const maxComments = 500;

// Получаем url аватара

const createAvatarUrl = (index) => `img/avatar-${index}.svg`;

// Задаём диапазон кол-ва аватаров

const AvatarRange = {
  min: 1,
  max: 6,
};

// Создаём  объект - комментарий

const createComment = () => {
  const randomCommentId = getRandomUniqueInteger(1, maxComments);
  const randomAvatarUrl = getRandomUniqueInteger(
    AvatarRange.min,
    AvatarRange.max
  );
  return {
    id: randomCommentId(),
    avatar: createAvatarUrl(randomAvatarUrl()),
    message: getRandomArrayIndex(MESSAGES),
    name: getRandomArrayIndex(NAMES),
  };
};

// Задаём диапазон кол-ва комментариев

const MessagesRange = {
  min: 1,
  max: 30,
};

// Создаём галлерею - массив объектов - фото

const createGallery = (quantity) => {
  const randomId = getRandomUniqueInteger(1, quantity);
  const randomPhotoUrl = getRandomUniqueInteger(1, quantity);
  return Array.from({ length: quantity }).map(() => ({
    id: randomId(),
    url: createPhotoUrl(randomPhotoUrl()),
    description: getRandomArrayIndex(DESCRIPTIONS),
    likes: getRandomInteger(LikesRange.min, LikesRange.max),
    comments: Array.from(
      { length: getRandomInteger(MessagesRange.min, MessagesRange.max) },
      createComment
    ),
  }));
};

createGallery(25);

import {
  getRandomInteger,
  getRandomUniqueInteger,
  getRandomArrayElement,
} from './functions.js';

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

// Задаём максимальное кол-во комментов

const MAX_COMMENTS = 500;

// Задаём диапазон кол-ва аватаров

const AvatarRange = {
  MIN: 1,
  MAX: 6,
};

// Задаём диапазон кол-ва лайков

const LikesRange = {
  MIN: 1,
  MAX: 200,
};

// Задаём диапазон кол-ва комментариев

const MessagesRange = {
  MIN: 1,
  MAX: 30,
};

// Создаём  объект - комментарий

const createComment = () => {
  const uniqueCommentId = getRandomUniqueInteger(1, MAX_COMMENTS);
  return {
    id: uniqueCommentId(),
    avatar: `img/avatar-${getRandomInteger(
      AvatarRange.MIN,
      AvatarRange.MAX
    )}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

// Создаём галлерею - массив объектов - фото

const createGallery = (quantity) => {
  const uniquePhotoId = getRandomUniqueInteger(1, quantity);
  const uniquePhotoUrl = getRandomUniqueInteger(1, quantity);
  return Array.from({ length: quantity }).map(() => ({
    id: uniquePhotoId(),
    url: `photos/${uniquePhotoUrl()}.jpeg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikesRange.MIN, LikesRange.MAX),
    comments: Array.from(
      { length: getRandomInteger(MessagesRange.MIN, MessagesRange.MAX) },
      createComment
    ),
  }));
};

// eslint-disable-next-line no-console
console.log(createGallery(25));

export { createGallery };

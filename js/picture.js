import { renderComments } from './comments.js';

const bigPictureElement = document.body.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentTotalCountElement = bigPictureElement.querySelector(
  '.social__comment-total-count'
);

const renderBigPicture = ({ url, likes, comments, description }) => {
  imgElement.setAttribute('src', url);
  imgElement.setAttribute('alt', description);
  likesElement.textContent = likes;
  commentTotalCountElement.textContent = comments.length;
  descriptionElement.textContent = description;
  renderComments(comments);
};

export { renderBigPicture };

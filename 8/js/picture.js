import { renderComments } from './comments';

const bigPictureElement = document.body.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentTotalCountElement = bigPictureElement.querySelector(
  '.social__comment-total-count'
);

const renderBigPicture = ({ url, likes, comments, description }) => {
  imgElement.src = url;
  imgElement.alt = description;
  likesElement.textContent = likes;
  commentTotalCountElement.textContent = comments.length;
  descriptionElement.textContent = description;
  renderComments(comments);
};

export { renderBigPicture };

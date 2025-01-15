const COMMENT_STEP = 5;
let currentCommentCount = 0;
let currentPostComments;

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement =
  bigPictureElement.querySelector('.social__comments');
const commentItemElement =
  commentsListElement.querySelector('.social__comment');
const commentsTotalQuantityElement = bigPictureElement.querySelector(
  '.social__comment-total-count'
);
const commentsShownQuantityElement = bigPictureElement.querySelector(
  '.social__comment-shown-count'
);
const commentsLoaderElement =
  bigPictureElement.querySelector('.comments-loader');

const renderComment = ({ avatar, name, message }) => {
  const commentElement = commentItemElement.cloneNode(true);
  const commentImgElement = commentElement.querySelector('.social__picture');
  const commentTextElement = commentElement.querySelector('.social__text');
  commentImgElement.setAttribute('src', avatar);
  commentImgElement.setAttribute('alt', name);
  commentTextElement.textContent = message;
  return commentElement;
};

const renderShownComments = () => {
  const commentFragment = document.createDocumentFragment();
  const shownComments = currentPostComments.slice(
    currentCommentCount,
    currentCommentCount + COMMENT_STEP
  );
  const shownCommentsLength = shownComments.length + currentCommentCount;

  shownComments.forEach((comment) => {
    const commentElement = renderComment(comment);
    commentFragment.appendChild(commentElement);
  });

  commentsListElement.appendChild(commentFragment);
  commentsShownQuantityElement.textContent = shownCommentsLength;
  commentsTotalQuantityElement.textContent = currentPostComments.length;
  commentsLoaderElement.classList.toggle(
    'hidden',
    shownCommentsLength >= currentPostComments.length
  );
  currentCommentCount += COMMENT_STEP;
};

const renderComments = (comments) => {
  currentPostComments = comments;
  commentsListElement.innerHTML = '';
  renderShownComments();
  commentsLoaderElement.addEventListener('click', renderShownComments);
};

const clearComments = () => {
  currentCommentCount = 0;
  commentsListElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', renderShownComments);
};

export { renderComments, clearComments };

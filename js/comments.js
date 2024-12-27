const renderComments = (comments) => {
  const commentsContainerElement = document.querySelector('.social__comments');
  const commentTemplateElement = document.querySelector('.social__comment');
  const commentFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const commentElement = commentTemplateElement.cloneNode(true);
    const commentImgElement = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentImgElement.src = avatar;
    commentImgElement.alt = name;
    commentText.textContent = message;
    commentFragment.appendChild(commentElement);
  });

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.appendChild(commentFragment);
};

export { renderComments };

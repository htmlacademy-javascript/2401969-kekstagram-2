const renderGallery = (gallery) => {
  const picturesContainerElement = document.querySelector('.pictures');
  const pictureTemplateElement = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  picturesContainerElement
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());

  gallery.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    pictureElement.setAttribute('data-picture-id', id);
    imgElement.setAttribute('src', url);
    imgElement.setAttribute('alt', description);
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(pictureFragment);
};

export { renderGallery };

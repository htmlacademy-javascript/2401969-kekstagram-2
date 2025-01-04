const renderGallery = (gallery) => {
  const picturesContainerElement = document.querySelector('.pictures');
  const pictureTemplateElement = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  gallery.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    pictureElement.href = url;
    pictureElement.dataset.pictureId = id;
    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(pictureFragment);
};

export { renderGallery };

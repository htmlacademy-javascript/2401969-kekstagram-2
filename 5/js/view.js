const renderGallery = (gallery) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  gallery.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    imgElement.dataset.id = id;
    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(pictureFragment);
};

export { renderGallery };

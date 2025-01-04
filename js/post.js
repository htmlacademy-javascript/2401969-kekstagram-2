import { isEscKey } from './utils.js';
import { renderBigPicture } from './picture.js';
import { clearComments } from './comments.js';

const renderPost = (posts) => {
  const userModalElement = document.body.querySelector('.big-picture');
  const userModalOpenElement = document.querySelector('.pictures');
  const userModalCloseElement = userModalElement.querySelector(
    '.big-picture__cancel'
  );

  const onDocumentEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      closeUserMоdal();
    }
  };

  function closeUserMоdal() {
    document.body.classList.remove('modal-open');
    userModalElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
    clearComments();
  }

  userModalCloseElement.addEventListener('click', () => {
    closeUserMоdal();
  });

  const openUserModal = () => {
    document.body.classList.add('modal-open');
    userModalElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  const onPreviewClick = (evt) => {
    const currentPictureElement = evt.target.closest('.picture');
    if (currentPictureElement) {
      evt.preventDefault();
      const currentPreview = posts.find(
        (picture) =>
          picture.id === Number(currentPictureElement.dataset.pictureId)
      );
      renderBigPicture(currentPreview);
      openUserModal();
    }
  };

  userModalOpenElement.addEventListener('click', onPreviewClick);
};

export { renderPost };

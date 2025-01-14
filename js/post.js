import { isEscKey } from './utils.js';
import { renderBigPicture } from './picture.js';
import { clearComments } from './comments.js';

const renderPost = (photosPreview) => {
  const userPostElement = document.body.querySelector('.big-picture');
  const userPostOpenElement = document.querySelector('.pictures');
  const userPostCloseElement = userPostElement.querySelector(
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
    userPostElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
    clearComments();
  }

  const openUserModal = () => {
    document.body.classList.add('modal-open');
    userPostElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  const onPreviewClick = (evt) => {
    const currentPictureElement = evt.target.closest('.picture');
    if (currentPictureElement) {
      evt.preventDefault();
      const currentPreview = photosPreview.find(
        (picture) =>
          picture.id ===
          Number(currentPictureElement.getAttribute('data-picture-id'))
      );
      renderBigPicture(currentPreview);
      openUserModal();
    }
  };

  userPostOpenElement.addEventListener('click', onPreviewClick);

  userPostCloseElement.addEventListener('click', () => {
    closeUserMоdal();
  });
};

export { renderPost };

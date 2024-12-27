import { isEscKey } from './utils.js';
import { renderBigPicture } from './picture.js';
//import { onDocumentEscKeydown, openUserModal } from './modal.js';

const renderPost = (posts) => {
  const userModalElement = document.body.querySelector('.big-picture');
  const userModalOpenElement = document.querySelector('.pictures');
  const userModalCloseElement = userModalElement.querySelector(
    '.big-picture__cancel'
  );
  const socialCommentCount = userModalElement.querySelector(
    '.social__comment-count'
  );
  const commentsLoader = userModalElement.querySelector('.comments-loader');

  const onDocumentEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      closeUserMоdal();
    }
  };

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

      // Скрываем блоки счетчика комментариев и загрузки новых комментариев
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    }
  };

  userModalOpenElement.addEventListener('click', onPreviewClick);

  function closeUserMоdal() {
    document.body.classList.remove('modal-open');
    userModalElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }

  userModalCloseElement.addEventListener('click', () => {
    closeUserMоdal();
  });
};

export { renderPost };

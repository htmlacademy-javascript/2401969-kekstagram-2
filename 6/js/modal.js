import { isEscKey } from './utils.js';

/*const userModalElement = document.body.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = userModalElement.querySelector(
  '.big-picture__cancel'
);*/

const onDocumentEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUserMоdal();
  }
};

function openUserModal(element) {
  document.body.classList.add('modal-open');
  element.classList.remove('.hidden');
  document.addEventListener('keydown', onDocumentEscKeydown);
}

function closeUserMоdal(element) {
  document.body.classList.remove('modal-open');
  element.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

export { onDocumentEscKeydown, openUserModal, closeUserMоdal };

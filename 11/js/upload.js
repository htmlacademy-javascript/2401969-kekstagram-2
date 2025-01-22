import { isEscKey } from './utils.js';
import { runValidation, clearValidation } from './validation.js';
import { runImageEdit, resetImageEdit } from './edit.js';
import { sendData } from './api.js';
import { sendMessage } from './messages.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormInputElement =
  uploadFormElement.querySelector('.img-upload__input');
const uploadImageElement = uploadFormElement.querySelector(
  '.img-upload__preview img'
);
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement =
  uploadFormElement.querySelector('.text__description');
const uploadOverlayElement = uploadFormElement.querySelector(
  '.img-upload__overlay'
);
const uploadFormCloseElement = uploadFormElement.querySelector(
  '.img-upload__cancel'
);
const uploadSubmitElement = uploadFormElement.querySelector(
  '.img-upload__submit'
);

const onDocumentEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    if (
      document.activeElement === hashtagsInputElement ||
      document.activeElement === descriptionInutElement
    ) {
      evt.stopPropagation();
    } else {
      closeUploadForm();
      //uploadFormElement.reset();
    }
  }
};

const onCloseButtonClick = () => closeUploadForm();

function closeUploadForm() {
  clearValidation();
  resetImageEdit();
  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  //uploadFormInputElement.setAttribute('value', '');
  uploadFormElement.reset();
}

const openUploadForm = () => {
  runValidation();
  runImageEdit();
};

uploadFormInputElement.addEventListener('change', () => {
  const file = uploadFormInputElement.files[0];
  uploadImageElement.src = URL.createObjectURL(file);
  document.body.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentEscKeydown);
  uploadFormCloseElement.addEventListener('click', onCloseButtonClick);
});

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formDataObject = new FormData(evt.target);

  uploadSubmitElement.setAttribute('disabled', '');

  sendData(formDataObject)
    .then(() => {
      closeUploadForm();
      sendMessage(true);
    })
    .catch(() => {
      document.removeEventListener('keydown', onDocumentEscKeydown);
      sendMessage(false);
    })
    .finally(uploadSubmitElement.removeAttribute('disabled', ''));
});

export { openUploadForm };

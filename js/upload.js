import { isEscKey } from './utils.js';
import { runValidation, clearValidation, pristine } from './validation.js';
import { runImageEdit, resetImageEdit } from './edit.js';
import { sendData } from './api.js';
import { showSendMessage } from './messages.js';
import { addFilePreview } from './preview.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormInputElement =
  uploadFormElement.querySelector('.img-upload__input');

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
      document.activeElement === descriptionInutElement ||
      document.querySelector('.error')
    ) {
      evt.stopPropagation();
    } else {
      closeUploadForm();
    }
  }
};

function closeUploadForm() {
  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  uploadFormElement.reset();
  resetImageEdit();
  clearValidation();
}

const onCloseButtonClick = () => closeUploadForm();

const openUploadForm = () => {
  runValidation();
  runImageEdit();
};

uploadFormInputElement.addEventListener('change', () => {
  addFilePreview();
  document.body.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentEscKeydown);
  uploadFormCloseElement.addEventListener('click', onCloseButtonClick);
});

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    uploadSubmitElement.setAttribute('disabled', 'true');
    const formDataObject = new FormData(evt.target);

    sendData(formDataObject)
      .then(() => {
        closeUploadForm();
        showSendMessage(true);
      })
      .catch(() => {
        showSendMessage(false);
      })
      .finally(() => {
        uploadSubmitElement.removeAttribute('disabled');
      });
  }
});

export { openUploadForm };

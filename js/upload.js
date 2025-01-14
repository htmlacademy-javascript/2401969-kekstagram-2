import { isEscKey } from './utils';
import { runValidation, clearValidation } from './validation';
import { runImageEdit, resetImageEdit } from './edit';

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
      uploadFormElement.reset();
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
  uploadFormInputElement.setAttribute('value', '');
}

const openUploadForm = () => {
  uploadFormInputElement.addEventListener('change', () => {
    document.body.classList.add('modal-open');
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);
    uploadFormCloseElement.addEventListener('click', onCloseButtonClick);
    runValidation();
    runImageEdit();
  });
};

export { openUploadForm };

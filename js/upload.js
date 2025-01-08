import { isEscKey } from './utils';
import { runValidation, clearValidation } from './validation';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadFormInput =
  imgUploadFormElement.querySelector('.img-upload__input');
const hashtagsInputElement =
  imgUploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement =
  imgUploadFormElement.querySelector('.text__description');
const imgUploadOverlay = imgUploadFormElement.querySelector(
  '.img-upload__overlay'
);
const uploadFormCloseElement = imgUploadFormElement.querySelector(
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
      imgUploadFormElement.reset();
    }
  }
};

const onCloseButtonClick = () => closeUploadForm();

function closeUploadForm() {
  clearValidation();
  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  uploadFormCloseElement.removeEventListener('click', onCloseButtonClick);
  imgUploadFormInput.value = '';
}

const openUploadForm = () => {
  imgUploadFormInput.addEventListener('change', () => {
    runValidation();
    document.body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);
    uploadFormCloseElement.addEventListener('click', onCloseButtonClick);
  });
};

export { openUploadForm };

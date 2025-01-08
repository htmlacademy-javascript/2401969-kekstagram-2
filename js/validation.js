import '../vendor/pristine/pristine.min.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const commentElement = imgUploadFormElement.querySelector('.text__description');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const validatesCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const getValues = (value) => value.toLowerCase().trim().split(' ');

const validatesHashtagWithRegex = (value) => {
  const values = getValues(value);
  const isValid = values.every((item) => hashtagRegex.test(item));
  return isValid || value.toLowerCase().trim().length === 0;
};

const validatesHashtagRepeats = (value) => {
  const duplicates = getValues(value).filter(
    (number, index, numbers) => numbers.indexOf(number) !== index
  );
  return duplicates.length === 0;
};

const validatesHashtagCount = (value) =>
  getValues(value).length <= MAX_HASHTAGS;

const runValidation = () => {
  pristine.addValidator(
    commentElement,
    validatesCommentLength,
    `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`
  );
  pristine.addValidator(
    hashtagsElement,
    validatesHashtagCount,
    'Превышено количество хэштегов'
  );
  pristine.addValidator(
    hashtagsElement,
    validatesHashtagWithRegex,
    'Введён невалидный хэштег'
  );
  pristine.addValidator(
    hashtagsElement,
    validatesHashtagRepeats,
    'Хэштеги повторяются'
  );
};

const clearValidation = () => pristine.reset();

export { runValidation, clearValidation };

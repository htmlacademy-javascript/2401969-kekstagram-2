import '../vendor/pristine/pristine.min.js';

const MAX_HASHTAGS_QTY = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const validatesCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const getValues = (value) => value.trim().split(/ +/g);

const validatesHashtagWithRegex = (value) => {
  const values = getValues(value);
  const isValid = values.every((item) => hashtagRegex.test(item));
  return isValid || value.trim().length === 0;
};

const validatesHashtagRepeats = (value) => {
  const duplicates = getValues(value.toLowerCase()).filter(
    (number, index, numbers) => numbers.indexOf(number) !== index
  );
  return duplicates.length === 0;
};

const validatesHashtagCount = (value) =>
  getValues(value).length <= MAX_HASHTAGS_QTY;

const runValidation = () => {
  pristine.addValidator(
    commentElement,
    validatesCommentLength,
    `Длина комментария больше ${MAX_COMMENT_LENGTH} символов.`
  );
  pristine.addValidator(
    hashtagsElement,
    validatesHashtagWithRegex,
    `Хэштег должен начинаться с # и содержать буквы и цифры до ${MAX_HASHTAG_LENGTH} символов.`
  );
  pristine.addValidator(
    hashtagsElement,
    validatesHashtagRepeats,
    'Хэштеги повторяются.'
  );
  pristine.addValidator(
    hashtagsElement,
    validatesHashtagCount,
    `Превышено количество хэштегов. Максимальное количество ${MAX_HASHTAGS_QTY}.`
  );
};

const clearValidation = () => {
  pristine.reset();
};

export { runValidation, clearValidation, pristine };

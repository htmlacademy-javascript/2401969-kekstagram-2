const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadInputElement = document.querySelector('.img-upload__input');
const uploadImageElement = document.querySelector('.img-upload__preview img');
const imagePreviewElements = document.querySelectorAll('.effects__preview');

const addFilePreview = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    uploadImageElement.src = URL.createObjectURL(file);
    imagePreviewElements.forEach((el) =>
      el.style.setProperty(
        'background-image',
        `url(${URL.createObjectURL(file)})`
      )
    );
  }
};

export { addFilePreview };

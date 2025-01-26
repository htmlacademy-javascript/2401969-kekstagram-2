import { isEscKey } from './utils.js';

const ERROR_SHOWN_TIME = 5000;
const messageFragment = document.createDocumentFragment();

const showLoadErrorMessage = () => {
  const errorTemplateElement = document
    .querySelector('#data-error')
    .content.querySelector('.data-error');
  const errorElement = errorTemplateElement.cloneNode(true);
  messageFragment.appendChild(errorElement);
  document.body.append(messageFragment);
  setTimeout(() => errorElement.remove(), ERROR_SHOWN_TIME);
};

const showSendMessage = (status) => {
  const result = status ? 'success' : 'error';
  const messageTemplateElement = document
    .querySelector(`#${result}`)
    .content.querySelector(`.${result}`);
  const messageElement = messageTemplateElement.cloneNode(true);
  messageFragment.appendChild(messageElement);
  document.body.append(messageFragment);
  const messageButtonElement = messageElement.querySelector(
    `.${result}__button`
  );

  const onEscCloseMessage = (evt) => {
    if (isEscKey(evt) && messageElement.isConnected) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target === messageElement) {
      evt.stopPropagation();
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscCloseMessage);
    document.removeEventListener('click', onOverlayClick);
  }

  const onClickCloseMessage = () => closeMessage();

  messageButtonElement.addEventListener('click', onClickCloseMessage);
  document.addEventListener('keydown', onEscCloseMessage);
  document.addEventListener('click', onOverlayClick);
};

export { showLoadErrorMessage, showSendMessage };

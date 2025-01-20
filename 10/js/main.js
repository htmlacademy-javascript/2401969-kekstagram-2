import { renderGallery } from './view.js';
import { renderPost } from './post.js';
import { openUploadForm } from './upload.js';
import { getData } from './api.js';
import { dataErrorMessage } from './messages.js';

getData()
  .then((data) => {
    renderGallery(data);
    renderPost(data);
  })
  .catch(() => {
    dataErrorMessage();
  });

openUploadForm();

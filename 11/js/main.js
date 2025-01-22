import { renderGallery } from './view.js';
import { renderPost } from './post.js';
import { openUploadForm } from './upload.js';
import { getData } from './api.js';
import { dataErrorMessage } from './messages.js';
import { runImageFilter, filterGallery } from './filter.js';

getData()
  .then((data) => {
    runImageFilter(data);
    renderGallery(filterGallery());
    renderPost(data);
  })
  .catch(() => {
    dataErrorMessage();
  });

openUploadForm();

import { createGallery } from './data.js';
import { renderGallery } from './view.js';
import { renderPost } from './post.js';

const photosPreview = createGallery(25);

renderGallery(photosPreview);
renderPost(photosPreview);

import { createGallery } from './data.js';
import { renderGallery } from './view.js';

const photosPreview = createGallery(25);

renderGallery(photosPreview);

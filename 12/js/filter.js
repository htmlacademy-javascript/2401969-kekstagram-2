import { debounce, randomSort } from './utils.js';
import { renderGallery } from './view.js';

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const PICTURES_COUNT = 10;

const RERENDER_DELAY = 500;

const imgFiltersElement = document.querySelector('.img-filters');

const renderGalleryDebounced = debounce(renderGallery, RERENDER_DELAY);

let currentFilter = Filters.DEFAULT;
let pictures = [];

const runImageFilter = (data) => {
  imgFiltersElement.classList.remove('img-filters--inactive');
  pictures = [...data];
  currentFilter = Filters.DEFAULT;
};

const discussedSort = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const filterGallery = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...pictures].sort(discussedSort);
    default:
      return [...pictures];
  }
};

imgFiltersElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  imgFiltersElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  renderGalleryDebounced(filterGallery());
});

export { runImageFilter, filterGallery };

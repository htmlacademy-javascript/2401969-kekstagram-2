import '../vendor/nouislider/nouislider.js';

const imageUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleValueElement = imageUploadScaleElement.querySelector(
  '.scale__control--value'
);
const imageUploadElement = document.querySelector('.img-upload__preview img');
const filterLevelElement = document.querySelector('.img-upload__effect-level');
const filterLevelValueElement = filterLevelElement.querySelector(
  '.effect-level__value'
);
const filterLevelSliderElement = filterLevelElement.querySelector(
  '.effect-level__slider'
);
const filtersListElement = document.querySelector('.effects__list');

const Scale = {
  MIN: 0.25,
  MAX: 1,
  STEP: 0.25,
  DEFAULT: 1,
};

const filters = {
  none: {
    filter: 'none',
  },
  chrome: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};

let scaleValue = Scale.DEFAULT;

const changeScale = (value) => {
  scaleValue = value;
  imageUploadElement.style.setProperty('transform', `scale(${scaleValue})`);
  scaleValueElement.setAttribute('value', `${scaleValue * 100}%`);
};

const smallerScale = () => {
  if (scaleValue > Scale.MIN) {
    changeScale(scaleValue - Scale.STEP);
  }
};

const biggerScale = () => {
  if (scaleValue < Scale.MAX) {
    changeScale(scaleValue + Scale.STEP);
  }
};

const createSlider = () => {
  noUiSlider.create(filterLevelSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

filtersListElement.addEventListener('change', (evt) => {
  evt.stopPropagation();

  if (evt.target.value === 'none') {
    const removeFilter = () => {
      filterLevelElement.classList.add('hidden');
      imageUploadElement.style.setProperty('filter', '');
    };
    return removeFilter();
  }

  filterLevelElement.classList.remove('hidden');
  filterLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: filters[evt.target.value].min,
      max: filters[evt.target.value].max,
    },
    start: filters[evt.target.value].start,
    step: filters[evt.target.value].step,
  });

  filterLevelSliderElement.noUiSlider.on('update', () => {
    filterLevelValueElement.setAttribute(
      'value',
      filterLevelSliderElement.noUiSlider.get()
    );

    const effectValue = filters[evt.target.value].filter;
    const unit = filters[evt.target.value].unit;

    imageUploadElement.style.setProperty(
      'filter',
      `${effectValue}(${filterLevelValueElement.value}${unit})`
    );
  });
});

const runImageEdit = () => {
  imageUploadScaleElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')) {
      smallerScale();
    }
    if (evt.target.classList.contains('scale__control--bigger')) {
      biggerScale();
    }
  });
  createSlider();
  filterLevelElement.classList.add('hidden');
};

const resetImageEdit = () => {
  filterLevelSliderElement.noUiSlider.reset();
  filterLevelElement.classList.add('hidden');
  scaleValue = Scale.DEFAULT;
  scaleValueElement.setAttribute('value', `${scaleValue * 100}%`);
  imageUploadElement.style.removeProperty('filter');
  imageUploadElement.style.removeProperty('transform');
};

export { runImageEdit, resetImageEdit };

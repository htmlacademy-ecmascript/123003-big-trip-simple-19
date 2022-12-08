import FilterPresenter from './presenter/filter-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';

const pointsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter({filterContainer: filterContainer});
const pointsPresenter = new PointsPresenter({pointsContainer: pointsContainer});

filterPresenter.init();
pointsPresenter.init();

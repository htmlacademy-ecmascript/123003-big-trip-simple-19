import { render } from './framework/render.js';
import PointsPresenter from './presenter/points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import NewEventButtonView from './view/new-event-button-view.js';

const pointsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const pointsPresenter = new PointsPresenter({
  container: pointsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
});

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  pointsModel,
});

render (new NewEventButtonView(), document.querySelector('.trip-main'));

pointsPresenter.init();
filterPresenter.init();


import { render } from './framework/render.js';
import PointsPresenter from './presenter/points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';

const pointsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const pointsPresenter = new PointsPresenter({
  container: pointsContainer,
  pointsModel,
  filterModel,
  destinationsModel,
  offersModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  filterModel,
  pointsModel,
});

const newPointButtonView = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonView.setEnabled();
}

function handleNewPointButtonClick() {
  pointsPresenter.createPoint();
  newPointButtonView.setDisabled();
}

render (newPointButtonView, document.querySelector('.trip-main'));

pointsPresenter.init();
filterPresenter.init();


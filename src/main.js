import { render } from './framework/render.js';
import PointsPresenter from './presenter/points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic fgh5fg6hfgrdfrr8hf5gh';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple/';

const pointsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const pointsPresenter = new PointsPresenter({
  container: pointsContainer,
  pointsModel,
  filterModel,
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

filterPresenter.init();
pointsPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonView, document.querySelector('.trip-main'));
  });


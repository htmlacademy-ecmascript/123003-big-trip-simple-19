import HeaderPresenter from './presenter/header-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

const container = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const headerPresenter = new HeaderPresenter({ container: headerContainer });

const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter({
  container: container,
  pointsModel,
});

headerPresenter.init();
pointsPresenter.init();

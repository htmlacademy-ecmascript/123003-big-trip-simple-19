import { render } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import NewEventButtonView from './view/new-event-button-view.js';
import { generateFilterItems } from './mock/filter.js';
import { generateSortItems } from './mock/sort.js';

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

const generatedFilterItems = generateFilterItems(pointsModel.points);
const generatedSortItems = generateSortItems(pointsModel.points);

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  filterItems: generatedFilterItems,
});
const sortPresenter = new SortPresenter({
  container: pointsContainer,
  sortItems: generatedSortItems,
});

render (new NewEventButtonView(), document.querySelector('.trip-main'));

filterPresenter.init();
sortPresenter.init();
pointsPresenter.init();


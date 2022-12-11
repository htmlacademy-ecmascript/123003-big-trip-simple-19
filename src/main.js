import HeaderPresenter from './presenter/header-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';

const container = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const headerPresenter = new HeaderPresenter({headerContainer: headerContainer});

//не понятна запись {container: container}
const pointsPresenter = new PointsPresenter({container: container});

headerPresenter.init();
pointsPresenter.init();

import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';
import { render } from '../render.js';

export default class PointsPresenter {
  pointsListView = new PointsListView();

  constructor ({ container, pointsModel, destinationsModel, offersModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = [...this.destinationsModel.getDestinations()];
    this.offers = [...this.offersModel.getOffers()];

    const pointFormView = new PointFormView({
      point: this.points[0],
      destinations: this.destinations,
      offers: this.offers,
    });
    render (pointFormView, this.pointsListView.getElement());

    for (const point of this.points) {
      const pointView = new PointView({
        point,
        destinations: this.destinations,
        offers: this.offers,
      });
      render(pointView, this.pointsListView.getElement());
    }

    render (new SortView(), this.container);
    render (this.pointsListView, this.container);
  }
}

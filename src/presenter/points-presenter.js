import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';
import { render } from '../render.js';

export default class PointsPresenter {
  pointsListView = new PointsListView();

  constructor ({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render (new SortView(), this.container);


    for (let i = 0; i < this.points.length; i++) {
      if(i === 0){
        const pointFormView = new PointFormView({
          point: this.points[i],
          destinations: this.destinations,
          offers: this.offers,
        });
        render (pointFormView, this.pointsListView.getElement());
      }
      const pointView = new PointView({
        point: this.points[i],
        destinations: this.destinations,
        offers: this.offers,
      });

      render(pointView, this.pointsListView.getElement());
    }

    render (this.pointsListView, this.container);
  }
}

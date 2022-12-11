import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';
import PointFormHeaderView from '../view/point-form-header-view.js';
import RollupButtonView from '../view/rollup-button-view.js';
import PointOffersView from '../view/point-offers-view.js';
import PointDestinationView from '../view/point-destination-view.js';
import PointPhotosView from '../view/point-photos-view.js';
import PointEventView from '../view/point-event-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class PointsPresenter {
  pointsList = new PointsListView();
  pointsItem = new PointView();
  pointForm = new PointFormView();
  pointFormHeader = new PointFormHeaderView();
  pointDestination = new PointDestinationView();

  // непонятная мне конструкция
  //конструктор принимает объект, но что это за объект?
  constructor ({container}) {
    this.container = container;
  }

  init() {
    render (new SortView(), this.container);
    render (this.pointsList, this.container);
    render (this.pointForm, this.pointsItem.getElement());

    const renderEvent = () => {
      render(new PointEventView, this.pointsList.getElement());
    };

    //как это все лучше организовать
    //отрисовываются в одну li, как создать 2 новых экземпляра li
    // через new item не отрисовывается совсем
    const renderEditForm = () => {
      render (this.pointsItem, this.pointsList.getElement());
      render (new PointFormHeaderView(), this.pointForm.getElement());
      render (new PointOffersView(), this.pointForm.getElement());
      render (new PointDestinationView(), this.pointForm.getElement());
      render (new RollupButtonView(), this.pointFormHeader.getElement());
    };

    const renderCreateForm = () => {
      render (this.pointsItem, this.pointsList.getElement());
      render (new PointFormHeaderView(), this.pointForm.getElement());
      render (new PointOffersView(), this.pointForm.getElement());
      render (new PointDestinationView(), this.pointForm.getElement());
      render (new PointPhotosView(), this.pointDestination.getElement());
    };

    renderEditForm();
    renderCreateForm();

    for (let i = 0; i < 3; i++) {
      renderEvent();
    }
  }
}

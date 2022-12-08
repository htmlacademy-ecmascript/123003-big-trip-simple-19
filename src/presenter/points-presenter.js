import MainContainer from '../view/main-container-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointEventView from '../view/point-event-view.js';
import PointFormView from '../view/point-form-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointDetailsView from '../view/point-details-view.js';
import PointOffersView from '../view/point-offers-view.js';
import PointDestinationView from '../view/point-destination-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import NoPointsDescriptionView from '../view/no-points-description-view.js';
import { render } from '../render.js';

export default class PointsPresenter {
  mainContainer = new MainContainer();
  pointsList = new PointsListView();
  pointsItem = new PointView();
  pointForm = new PointFormView();
  pointDetails = new PointDetailsView();

  constructor ({pointsContainer}) {
    this.pointsContainer = pointsContainer;
  }

  init() {
    render (new SortView(), this.pointsContainer);
    render (this.pointsList, this.pointsContainer);
    for (let i = 0; i < 4; i++) {
      render (this.pointsItem, this.pointsList.getElement());
      if(i === 0){
        render (this.pointForm, this.pointsItem.getElement());
        render (new PointEditView(), this.pointForm.getElement());
        render (this.pointDetails, this.pointForm.getElement());
        render (new PointOffersView(), this.pointDetails.getElement());
        render (new PointDestinationView(), this.pointDetails.getElement());
      }
      else{
        render (new PointEventView(), this.pointsItem.getElement());
      }
    }
    render (new LoadingView(), this.pointsContainer);
    render (new NoPointsDescriptionView(), this.pointsContainer);
  }
}

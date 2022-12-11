
import HeaderContainerView from '../view/header-container-view.js';
import FilterView from '../view/filter-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { render } from '../render.js';


export default class FilterPresenter {
  headerContainer = new HeaderContainerView();

  constructor ({headerContainer}) {
    this.headerContainer = headerContainer;
  }

  init() {
    render (new FilterView(), this.headerContainer);
    render (new NewEventButtonView(), this.headerContainer);
  }
}

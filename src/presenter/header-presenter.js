import FilterView from '../view/filter-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { render } from '../render.js';

export default class HeaderPresenter {
  headerContainer = document.querySelector('.trip-controls__filters');

  constructor ({ container }) {
    this.container = container;
  }

  init() {
    render (new FilterView(), this.headerContainer);
    render (new NewEventButtonView(), this.container);
  }
}

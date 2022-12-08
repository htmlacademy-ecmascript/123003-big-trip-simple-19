
import MainContainer from '../view/main-container-view.js';
import FilterContainer from '../view/filter-container-view.js';
import FilterView from '../view/filter-view.js';
import { render } from '../render.js';


export default class FilterPresenter {
  mainContainer = new MainContainer();
  filterContainer = new FilterContainer();

  constructor ({filterContainer}) {
    this.filterContainer = filterContainer;
  }

  init() {
    render (new FilterView(), this.filterContainer);
  }
}

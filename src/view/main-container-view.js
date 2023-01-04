import AbstractView from '../framework/view/abstract-view.js';

function createTemplate() {
  return '<section class="trip-events"></section>';
}

export default class MainContainerView extends AbstractView {
  get template() {
    return createTemplate();
  }
}

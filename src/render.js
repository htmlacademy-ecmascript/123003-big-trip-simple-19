const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) { //зачем создавать контейнер, класть туда template, и в итоге его же и отдавать
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};

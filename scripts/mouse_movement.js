const previousElementProps = {
  previousElement: undefined,
  previousStyleCssText: undefined,
};

let currentElement;
let getShouldExecute;
let setGetShouldExecute = (newGetShouldExecute) => {
  getShouldExecute = newGetShouldExecute;
};

const mouseMoveEventListener = (e) => {
  const {
    previousElement,
    previousStyleCssText,
  } = previousElementProps;
  // saves element with target text
  currentElement = document.elementFromPoint(e.clientX, e.clientY);
  if (
    previousElement === currentElement // hovering over the same element
    && (getShouldExecute && getShouldExecute()(currentElement)) // when settings or body element
  ) {
    return;
  }

  // styling
  const prevOrCurrentElement = (previousElement ?? currentElement);
  const prevOrCurrentStyleCssText = (previousStyleCssText ?? currentElement.style.cssText);
  prevOrCurrentElement.style.cssText = prevOrCurrentStyleCssText;

  previousElementProps.previousElement = currentElement;
  previousElementProps.previousStyleCssText = currentElement.style.cssText;

  currentElement.style.background = "#000000";
  currentElement.style.color = "#eeeeee";
}

const mouseLeaveEventListener = (e) => {
  const { previousStyleCssText } = previousElementProps;
  
  if (
    getShouldExecute && getShouldExecute()(currentElement)
  ) {
    return;
  }

  currentElement.style.cssText = previousStyleCssText;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
  setGetShouldExecute,
}

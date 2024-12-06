const previousElementProps = {};
let currentElement = undefined;
let getShouldExecute;
let setGetShouldExecute = (newGetShouldExecute) => {
  getShouldExecute = newGetShouldExecute;
};

const mouseMoveEventListener = (e) => {
  const {
    previousElement,
    previousElementOriginalStyle,
  } = previousElementProps;
  // saves element with target text
  currentElement = document.elementFromPoint(e.clientX, e.clientY);
  if (
    previousElement === currentElement
    || (getShouldExecute && !getShouldExecute()(currentElement))
  ) {
    return;
  }

  // styling
  const prevOrCurrentElement = (previousElement ?? currentElement);
  const prevOrCurrentStyle = (previousElementOriginalStyle ?? currentElement.style);
  (prevOrCurrentElement).style = prevOrCurrentStyle;
  previousElementProps.previousElement = currentElement;
  previousElementProps.previousElementOriginalStyle = currentElement.style;
  currentElement.style.background = "#000000";
  currentElement.style.color = "#eeeeee";
}

const mouseLeaveEventListener = (e) => {
  const {
    previousElementOriginalStyle,
  } = previousElementProps;
  
  if (
    getShouldExecute && !getShouldExecute()(currentElement)
  ) {
    return;
  }

  delete currentElement.style;
  currentElement.style = previousElementOriginalStyle;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
  setGetShouldExecute,
}

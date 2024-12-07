let i = 0;
const previousElementProps = {
  previousElement: undefined,
  previousElementStyle: undefined,
  previousElementOriginalStyle: undefined,
  previousElementColor: undefined,
};

let currentElement = undefined;
let getShouldExecute;
let setGetShouldExecute = (newGetShouldExecute) => {
  getShouldExecute = newGetShouldExecute;
};

const mouseMoveEventListener = (e) => {
  const {
    previousElement,
    previousElementOriginalBackground,
    previousElementColor,
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
  console.log(i, "mouseMoveEventListener begin", currentElement.style.background, currentElement.style.color);
  const prevOrCurrentElement = (previousElement ?? currentElement);
  const prevOrCurrentColor = (previousElementColor ?? currentElement.style.color);
  const prevOrCurrentBackground = (previousElementOriginalBackground ?? currentElement.style.background);
  (prevOrCurrentElement).style.background = prevOrCurrentBackground;
  (prevOrCurrentElement).style.color = prevOrCurrentColor;
  previousElementProps.previousElement = currentElement;
  previousElementProps.previousElementOriginalBackground = currentElement.style.background;
  previousElementProps.previousElementColor = currentElement.style.color;
  currentElement.style.background = "#000000";
  currentElement.style.color = "#eeeeee";
  console.log(i, "mouseMoveEventListener end", currentElement.style.background, currentElement.style.color);
  i++;
}

const mouseLeaveEventListener = (e) => {
  const {
    previousElementOriginalBackground,
    previousElementColor,
  } = previousElementProps;
  
  if (
    getShouldExecute && !getShouldExecute()(currentElement)
  ) {
    return;
  }

  console.log(i, "mouseLeaveEventListener begin", currentElement.style.background, currentElement.style.color);

  currentElement.style.background = previousElementOriginalBackground;
  currentElement.style.color = previousElementColor;

  console.log(i, "mouseLeaveEventListener end", currentElement.style.background, currentElement.style.color);
  i++;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
  setGetShouldExecute,
}

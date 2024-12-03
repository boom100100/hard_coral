const previousElementProps = {};
let currentElement = undefined;

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
    || currentElement.id === "96005210-8bc2-48ca-9b13-5818a7a9be20" // id for settings UI
  ) {
    return;
  }

  // styling
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
}

const mouseLeaveEventListener = (e) => {
  const {
    previousElementOriginalBackground,
    previousElementColor,
  } = previousElementProps;
  
  currentElement.style.background = previousElementOriginalBackground;
  currentElement.style.color = previousElementColor;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
}

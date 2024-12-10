const previousElementProps = {
  previousElement: undefined,
  previousStyleCssText: undefined,
  previousStyle: undefined,
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
    previousStyle,
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
  const prevOrCurrentStyle = (previousStyle ?? currentElement.style);
  // const prevOrCurrentStyleCssText = (previousStyleCssText ?? currentElement.style.cssText);

  // set previous element back how it was
  prevOrCurrentElement.style = prevOrCurrentStyle;
  // prevOrCurrentElement.style.cssText = prevOrCurrentStyleCssText;

  // looking forward: currentElement (before its change) is the future previousElement
  previousElementProps.previousElement = currentElement;
  previousElementProps.previousStyle = currentElement.style;
  // previousElementProps.previousStyleCssText = currentElement.style.cssText;
  
  // highlight currentElement
  currentElement.style.background = "#000000";
  currentElement.style.color = "#eeeeee";
}

const mouseLeaveEventListener = (e) => {
  const { previousStyleCssText, previousStyle } = previousElementProps;
  
  if (
    getShouldExecute && getShouldExecute()(currentElement)
  ) {
    return;
  }

  currentElement.style = previousStyle;
  // currentElement.style.cssText = previousStyleCssText;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
  setGetShouldExecute,
}

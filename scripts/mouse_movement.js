const previousElementProps = {
  previousElement: undefined,
  previousStyleCssText: undefined,
};

let hadRecentLeaveEvent = false;
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
    (
      previousElement === currentElement // hovering over the same element
      && !hadRecentLeaveEvent // edge case: mouse leaving screen might be followed by re-enter ay same element
    )
    || (getShouldExecute && !getShouldExecute()(currentElement)) // when settings, body, or html element
  ) {
    return;
  }

  // styling
  const prevOrCurrentElement = (previousElement ?? currentElement);
  // style.cssText reverts more smoothly than style, for some reason.
  // style is probably just not writeable.
  const prevOrCurrentStyleCssText = (previousStyleCssText ?? currentElement.style.cssText);

  // set previous element back how it was
  prevOrCurrentElement.style.cssText = prevOrCurrentStyleCssText;

  // looking forward: currentElement (before its change) is the future previousElement
  previousElementProps.previousElement = currentElement;
  previousElementProps.previousStyleCssText = currentElement.style.cssText;

  // highlight currentElement
  currentElement.style.background = "#000000";
  currentElement.style.color = "#eeeeee";
  hadRecentLeaveEvent = false;
}

const mouseLeaveEventListener = (e) => {
  const { previousStyleCssText, previousElement } = previousElementProps;
  
  if (
    (getShouldExecute && !getShouldExecute()(currentElement)) // when settings, body, or html element
  ) {
    return;
  }

  // styling
  const prevOrCurrentElement = (previousElement ?? currentElement);
  // style.cssText reverts more smoothly than style, for some reason.
  // style is probably just not writeable.
  const prevOrCurrentStyleCssText = (previousStyleCssText ?? currentElement.style.cssText);

  // set previous element back how it was
  prevOrCurrentElement.style.cssText = prevOrCurrentStyleCssText;
  
  // looking forward: currentElement (before its change) is the future previousElement
  previousElementProps.previousElement = currentElement;
  previousElementProps.previousStyleCssText = currentElement.style.cssText;
  
  // highlight currentElement
  currentElement.style.cssText = prevOrCurrentStyleCssText;

  hadRecentLeaveEvent = true;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
  setGetShouldExecute,
}

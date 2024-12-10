const previousElementProps = {
  previousElement: undefined,
  previousStyleCssText: undefined,
};

let hadRecentLeaveEvent = false;
let currentElement;

const setStyling = () => {
  const {
    previousElement,
    previousStyleCssText,
  } = previousElementProps;

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

  return prevOrCurrentStyleCssText;
};

const mouseMoveEventListener = (e) => {
  // saves element with target text
  currentElement = document.elementFromPoint(e.clientX, e.clientY);
  
  if (
    previousElementProps.previousElement === currentElement // hovering over the same element
    && !hadRecentLeaveEvent // edge case: mouse leaving screen might be followed by re-enter at the same element
  ) {
    return;
  }

  setStyling();

  // highlight currentElement
  currentElement.style.background = "#000000";
  currentElement.style.color = "#eeeeee";
  hadRecentLeaveEvent = false;
}

const mouseLeaveEventListener = (e) => {
  const prevOrCurrentStyleCssText = setStyling();
  // highlight currentElement
  currentElement.style.cssText = prevOrCurrentStyleCssText;

  hadRecentLeaveEvent = true;
}

export {
  mouseMoveEventListener,
  mouseLeaveEventListener,
}

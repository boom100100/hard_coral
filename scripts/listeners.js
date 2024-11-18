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
  if (previousElement === currentElement) {
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

// figure out why audio play doesn't always work
//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song
const clickEventListener =  (e) => {
  const allContent = currentElement.innerText;
  console.log(allContent);
  
  // const cleanContent = (content) => {
  //   return content;
  // }
  
  // const cleanedContent = cleanContent(allContent);
  
  // const msg = new SpeechSynthesisUtterance(cleanedContent);
  // // msg.text = cleanedContent;
  // window.speechSynthesis.speak(msg);
}

export {
  clickEventListener,
  mouseMoveEventListener,
}

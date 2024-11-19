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

//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song
const clickEventListener =  (e) => {
  // Audio play doesn't always work because the queue gets stuck sometimes.
  // Cancel it until it stops (one cancel per queued tts reading).
  while (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  const allContent = currentElement.innerText;
  console.log(allContent);

  const cleanContent = (content) => {
    return content;
  }

  const cleanedContent = cleanContent(allContent);
  const words = cleanedContent.split(" ");
  let pitch = 0;
  let rate = .5;
  for (let word of words) {
    if (pitch >= 2) {
      pitch = 0;
    }
    // do sm
    const msg = new SpeechSynthesisUtterance(word);
    msg.pitch = pitch;
    msg.rate = rate;
    window.speechSynthesis.speak(msg);

    pitch += .4;
  }

  // readded more natural sounding speech: one consolidated text string
  const msg = new SpeechSynthesisUtterance(cleanedContent);
  window.speechSynthesis.speak(msg);
}

export {
  clickEventListener,
  mouseMoveEventListener,
}

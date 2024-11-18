console.log("Extension has run.");
// figure out why it doesn't always work
//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song

const previousElementProps = {};
let currentElement;

const setListeners = () => {
  // listener that styles hovered element and saves its text
  document.addEventListener('mousemove', e => {
    const {
      previousElement,
      previousElementOriginalBackground,
      previousElementColor,
    } = previousElementProps;
    // saves text (entire element, actually)
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
  });
  
  // listener that triggers playing text to speech on click (mouseup, actually) event
  document.body.addEventListener('click', setSpeechSynthesis, true); 
};

const setSpeechSynthesis = (e) => {
  const allContent = currentElement.innerText;
  console.log(allContent);
  
  const cleanContent = (content) => {
    return content;
  }
  
  const cleanedContent = cleanContent(allContent);
  
  const msg = new SpeechSynthesisUtterance(cleanedContent);
  // msg.text = cleanedContent;
  window.speechSynthesis.speak(msg);
}

if ('speechSynthesis' in window) {
  console.log('is supported');
  setListeners();
 }else{
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

console.log("Extension has run.");
// figure out why it doesn't always work
//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song

let previousElement = undefined;
let previousElementOriginalBackground = undefined;
let currentElement;

const setSelectedElement = () => {
  document.addEventListener('mousemove', e => {
    currentElement = document.elementFromPoint(e.clientX, e.clientY);
    if (previousElement === currentElement) {
      return;
    }

    const prevOrCurrentElement = (previousElement ?? currentElement);
    const prevOrCurrentBackground = (previousElementOriginalBackground ?? currentElement.style.background);
    (prevOrCurrentElement).style.background = prevOrCurrentBackground;
    previousElement = currentElement;
    previousElementOriginalBackground = currentElement.style.background;
    currentElement.style.background = "#000000";
    console.log(currentElement.innerText);
  });
};

const getTextFromSelectedElement = () => {
  return currentElement.innerText;
};

const setSpeechSynthesis = () => {
  const tags = document.querySelectorAll("*");
  const allContent = tags[0].innerText;
  
  const cleanContent = (content) => {
    return content;
  }
  
  const cleanedContent = cleanContent(allContent);
  
  var msg = new SpeechSynthesisUtterance();
  msg.text = cleanedContent;
  window.speechSynthesis.speak(msg);
}

if ('speechSynthesis' in window) {
  console.log('is supported');
  setSpeechSynthesis();
 }else{
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

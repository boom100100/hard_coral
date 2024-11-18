console.log("Extension has run.");

var addListeners = (clickEventListener, mouseMoveEventListener) => {
  // listener that styles hovered element and saves its text
  document.addEventListener('mousemove', mouseMoveEventListener);
  
  // listener that triggers playing text to speech on click ~(mouseup, actually)~ event
  document.body.addEventListener('click', clickEventListener, true); 
};

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const src = chrome.runtime.getURL("scripts/listeners.js");
    const listeners = await import(src);
    const {clickEventListener, mouseMoveEventListener} = listeners;
    addListeners(clickEventListener, mouseMoveEventListener);
  })();
 } else {
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

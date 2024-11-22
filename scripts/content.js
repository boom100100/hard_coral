console.log("Extension has run.");

var addListener = (destination, event, listener, options=false) => {
  destination.addEventListener(event, listener, options);
};

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const src = chrome.runtime.getURL("scripts/listeners.js");
    const listeners = await import(src);
    const {clickEventListener, mouseMoveEventListener} = listeners;

    // listener that styles hovered element and saves its text
    addListener(document, 'mousemove', mouseMoveEventListener);

    // listener that triggers playing text to speech on click ~(mouseup, actually)~ event
    addListener(document.body, 'click', clickEventListener);
  })();

  (async () => {
    const src = chrome.runtime.getURL("scripts/music.js");
    const music = await import(src);
    const {musicClickEventListener } = music;
    addListener(document.body, 'click', musicClickEventListener, true);
  })();

 } else {
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

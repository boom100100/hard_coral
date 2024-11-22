console.log("Extension has run.");

var addListener = (destination, event, listener, options=false) => {
  destination.addEventListener(event, listener, options);
};

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const src = chrome.runtime.getURL("scripts/mouse_movement.js");
    const mouseMovement = await import(src);
    const {mouseMoveEventListener} = mouseMovement;

    // listener that styles hovered element and saves its text
    addListener(document, 'mousemove', mouseMoveEventListener);
  })();

  
  (async () => {
    const src = chrome.runtime.getURL("scripts/music.js");
    const music = await import(src);
    const {musicClickEventListener, bpm } = music;
    addListener(document.body, 'click', musicClickEventListener, true);

    (async () => {
      const src = chrome.runtime.getURL("scripts/voice.js");
      const voice = await import(src);
      const {voiceClickEventListener, setBpm} = voice;


      setBpm(bpm);

      // listener that triggers playing text to speech on click ~(mouseup, actually)~ event
      addListener(document.body, 'click', voiceClickEventListener);
    })();
  })();

 } else {
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

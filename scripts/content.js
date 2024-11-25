console.log("Extension has run.");

var addListener = (destination, event, listener, options=false) => {
  destination.addEventListener(event, listener, options);
};

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const srcToggleInteraction = chrome.runtime.getURL("scripts/toggle_interaction.js");
    const toggleInteraction = await import(srcToggleInteraction);
    // const toggleLinks = await import(srcToggleLinks);
    const { disableInteraction } = toggleInteraction;

    disableInteraction();

    const srcMouseMovement = chrome.runtime.getURL("scripts/mouse_movement.js");
    const mouseMovement = await import(srcMouseMovement);
    const {mouseMoveEventListener} = mouseMovement;

    // listener that styles hovered element and saves its text
    addListener(document, 'mousemove', mouseMoveEventListener);
  
    const srcMusic = chrome.runtime.getURL("scripts/music.js");
    const music = await import(srcMusic);
    const {musicClickEventListener, bpm, setPattern, reset: resetMusic } = music;
    addListener(document.body, 'click', musicClickEventListener, true);

    const srcSingingVoice = chrome.runtime.getURL("scripts/singing_voice.js");
    const singingVoice = await import(srcSingingVoice);
    const {voiceClickEventListener, setBpm, setSetPattern, reset: resetSinging } = singingVoice;

    setBpm(bpm);
    setSetPattern(setPattern);

    // listener that triggers playing text to speech on click event
    addListener(document.body, 'click', voiceClickEventListener, true);

    // TODO: maybe one day polling won't be necessary https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
    // Must work for SPAs as well.
    var oldHref = window.location.href;
    const id = setInterval(
      () => {
        if (oldHref === window.location.href) {
          return;
        }

        resetMusic();
        resetSinging();
        clearInterval(id);
      },
      200
    );
  })();

 } else {
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

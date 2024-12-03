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
    const { mouseMoveEventListener, mouseLeaveEventListener } = mouseMovement;

    // listener that styles hovered element and saves its text
    addListener(document, 'mousemove', mouseMoveEventListener);
    // listener that undoes styling
    addListener(document, 'mouseleave', mouseLeaveEventListener);

    const hembraSource = chrome.runtime.getURL("audio/bongo_hembra.wav");
    const machoSource = chrome.runtime.getURL("audio/bongo_macho.wav");
    
    var drums = {
      hembra: new Audio(hembraSource),
      macho: new Audio(machoSource),
    };

    const srcMusic = chrome.runtime.getURL("scripts/music.js");
    const music = await import(srcMusic);
    const {
      musicClickEventListener, getBps, setBpm, setBongoDrums, setPattern, reset: resetMusic
    } = music;
    addListener(document.body, 'click', musicClickEventListener, true);
    setBongoDrums(drums);

    const srcNoteMapper = chrome.runtime.getURL("scripts/note_mapper.js");
    const noteMapper = await import(srcNoteMapper);
    const { voiceOptions, voiceUriToNotePitchMapping } = noteMapper;

    const srcVoiceSelector = chrome.runtime.getURL("scripts/selectors.js");
    const voiceSelector = await import(srcVoiceSelector);
    const {
      setSetBpm, setSetSelectedVoiceURI, setVoiceOptions, selectedVoiceURI
    } = voiceSelector;

    setVoiceOptions(voiceOptions);
    setSetBpm(setBpm);

    const srcSingingVoice = chrome.runtime.getURL("scripts/singing_voice.js");
    const singingVoice = await import(srcSingingVoice);
    const {
      voiceClickEventListener, setGetBps, setMapping, setSelectedVoiceURI, setSetPattern, reset: resetSinging
    } = singingVoice;

    setSetSelectedVoiceURI(setSelectedVoiceURI);
    setGetBps(getBps);
    setMapping(voiceUriToNotePitchMapping);
    setSelectedVoiceURI(selectedVoiceURI);
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

console.log("Extension has run.");

var addListener = (destination, event, listener, options=false) => {
  destination.addEventListener(event, listener, options);
};

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const srcToggleInteraction = chrome.runtime.getURL("scripts/toggle_interaction.js");
    const toggleInteraction = await import(srcToggleInteraction);
    const { disableInteraction } = toggleInteraction;

    disableInteraction();

    const srcMouseMovement = chrome.runtime.getURL("scripts/mouse_movement.js");
    const mouseMovement = await import(srcMouseMovement);
    const {
      mouseMoveEventListener,
      mouseLeaveEventListener,
      setGetShouldExecute: setGetShouldExecuteMouse
    } = mouseMovement;

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
    // listener that resets beat on click event
    addListener(document.body, "click", musicClickEventListener, true);
    setBongoDrums(drums);

    const srcNoteMapper = chrome.runtime.getURL("scripts/note_mapper.js");
    const noteMapper = await import(srcNoteMapper);
    const { voiceOptions, voiceUriToNotePitchMapping } = noteMapper;

    const srcSelector = chrome.runtime.getURL("scripts/selectors.js");
    const selector = await import(srcSelector);
    const {
      append: appendSettings, setSetBpm, setSetSelectedVoiceURI, selectedVoiceURI, setVoiceOptions
    } = selector;

    setVoiceOptions(voiceOptions);
    setSetBpm(setBpm);
    
    const srcSingingVoice = chrome.runtime.getURL("scripts/singing_voice.js");
    const singingVoice = await import(srcSingingVoice);
    const {
      voiceClickEventListener,
      setGetBps,
      setMapping,
      setSelectedVoiceURI,
      setSetPattern,
      setGetShouldExecute: setGetShouldExecuteSinging,
      reset: resetSinging
    } = singingVoice;

    setSetSelectedVoiceURI(setSelectedVoiceURI);
    setGetBps(getBps);
    setMapping(voiceUriToNotePitchMapping);
    setSelectedVoiceURI(selectedVoiceURI);
    setSetPattern(setPattern);
    appendSettings();
  
    const getShouldExecute = () => {
      const settingsParent = document.getElementById(
        "96005210-8bc2-48ca-9b13-5818a7a9be20"
      );
      const settingsParentDescendents = Array.from(
        settingsParent.querySelectorAll("*")
      );
      const shouldExecute = currentElement => !(
        document.body === currentElement // hovering over body tag
        || document.querySelector("html") === currentElement // hovering over html tag
        || settingsParent === currentElement // hovering over settings top element
        || settingsParentDescendents.includes(currentElement) // hovering over settings descendent
      );
      return shouldExecute;
    }

    setGetShouldExecuteMouse(getShouldExecute);
    setGetShouldExecuteSinging(getShouldExecute);
    
    // listener that triggers playing text to speech on click event
    addListener(document.body, "click", voiceClickEventListener, true);

    const srcTerminator = chrome.runtime.getURL("scripts/terminator.js");
    const terminator = await import(srcTerminator);
    const { setLocationChangeMonitor } = terminator;
    setLocationChangeMonitor();
  })();

 } else {
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

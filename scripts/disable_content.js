console.log("Extension has been disabled.");

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const srcToggleInteraction = chrome.runtime.getURL("scripts/toggle_interaction.js");
    const toggleInteraction = await import(srcToggleInteraction);
    const { enableInteraction } = toggleInteraction;

    enableInteraction();

    const srcMusic = chrome.runtime.getURL("scripts/music.js");
    const srcSingingVoice = chrome.runtime.getURL("scripts/singing_voice.js");
    const srcMouseMovement = chrome.runtime.getURL("scripts/mouse_movement.js");
    const srcSelectors = chrome.runtime.getURL("scripts/selectors.js");

    const music = await import(srcMusic);
    const singingVoice = await import(srcSingingVoice);
    const mouseMovement = await import(srcMouseMovement);
    const selectors = await import(srcSelectors);

    const { mouseMoveEventListener, mouseLeaveEventListener } = mouseMovement;
    const { musicClickEventListener, reset: resetMusic } = music;
    const { voiceClickEventListener, reset: resetSinging } = singingVoice;
    const { remove: removeSettings } = selectors;

    document.removeEventListener('mousemove', mouseMoveEventListener);
    document.removeEventListener('mouseleave', mouseLeaveEventListener);
    document.body.removeEventListener('click', musicClickEventListener, true);
    document.body.removeEventListener('click', voiceClickEventListener, true);
    
    resetMusic();
    resetSinging();
    removeSettings();
  })();
}

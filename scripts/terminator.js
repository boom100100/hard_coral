const terminate = async () => {

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
    document.documentElement.removeEventListener('click', musicClickEventListener, true);
    document.documentElement.removeEventListener('click', voiceClickEventListener, true);
    
    resetMusic();
    resetSinging();
    removeSettings();
  }

  const setLocationChangeMonitor = () => {
    // TODO: maybe one day polling won't be necessary https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
    // Must work for SPAs as well.
    var oldHref = window.location.href;
    const id = setInterval(
      async () => {
        if (oldHref === window.location.href) {
          return;
        }

        terminate();
        clearInterval(id);
      },
      200
    );
  }

  export {
    setLocationChangeMonitor,
    terminate,
  }

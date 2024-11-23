console.log("Extension has been disabled.");

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const srcMusic = chrome.runtime.getURL("scripts/music.js");
    const srcSingingVoice = chrome.runtime.getURL("scripts/singing_voice.js");

    const srcMouseMovement = chrome.runtime.getURL("scripts/mouse_movement.js");

    const music = await import(srcMusic);
    const singingVoice = await import(srcSingingVoice);
    const mouseMovement = await import(srcMouseMovement);
    const { mouseMoveEventListener } = mouseMovement;
    const { musicClickEventListener } = music;
    const { voiceClickEventListener } = singingVoice;
    document.removeEventListener('mousemove', mouseMoveEventListener);
    document.body.removeEventListener('click', musicClickEventListener, true);
    document.body.removeEventListener('click', voiceClickEventListener, true);
  })();
}

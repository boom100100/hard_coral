console.log("Extension has been disabled.");

var removeListeners = (clickEventListener, mouseMoveEventListener) => {
  document.removeEventListener('mousemove', mouseMoveEventListener);
  document.body.removeEventListener('click', clickEventListener, true);
};

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const src = chrome.runtime.getURL("scripts/listeners.js");
    const listeners = await import(src);
    const {clickEventListener, mouseMoveEventListener} = listeners;
    removeListeners(clickEventListener, mouseMoveEventListener);
  })();
}

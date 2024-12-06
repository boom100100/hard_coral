console.log("Extension has been disabled.");
if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const srcTerminator = chrome.runtime.getURL("scripts/terminator.js");
    const terminator = await import(srcTerminator);
    const { terminate } = terminator;

    terminate();
  })();
}

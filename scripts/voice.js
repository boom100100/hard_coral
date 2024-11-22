
//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song
const voiceClickEventListener =  (e) => {
  // Audio play doesn't always work because the queue gets stuck sometimes.
  // Cancel it until it stops (one cancel per queued tts reading).
  while (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  const currentElement = document.elementFromPoint(e.clientX, e.clientY);
  const allContent = currentElement.innerText;
  console.log(allContent);

  const cleanContent = (content) => {
    return content;
  }

  const cleanedContent = cleanContent(allContent);

  // // individual words
  // const words = cleanedContent.split(" ");
  // var pitches = [0, 2, 1, 1];
  // let rates = [1, .5, 1.5, .5];
  // var i = 0;
  // for (let word of words) {
  //   const index = i % 4;
    
  //   const msg = new SpeechSynthesisUtterance(word);
  //   msg.pitch = pitches[index];
  //   msg.rate = rates[index];
  //   window.speechSynthesis.speak(msg);
    
  //   i++;
  // }
  
  // word buckets
  const words = cleanedContent.split(" ");
  var pitches = [0, 2, 1, 2, 1, 2];
  var rates = [1, .5, 1.25, .5, 1, 2];
  var i = 0;
  const wordBuckets = (() => {
    const buckets = [];
    let ks = [1,2,1,3];
    var j = 0;
    while (words.length > 0) {
      const index = j % ks.length;
      const bucket = words.splice(0, ks[index]);
      buckets.push(bucket);
      j++;
    }
    return buckets;
  })();

  for (let bucket of wordBuckets) {
    const index = i % pitches.length;
    // do sm
    const msg = new SpeechSynthesisUtterance(bucket.join(" "));
    msg.pitch = pitches[index];
    msg.rate = rates[index];
    window.speechSynthesis.speak(msg);
    i++;
  }

}

export {
  voiceClickEventListener,
}

let bpm;
const setBpm = (newBpm) => {
  bpm = newBpm;
};

//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song
const voiceClickEventListener = (e) => {
  // Audio play doesn't always work because the queue gets stuck sometimes.
  // Cancel it until it stops (one cancel per queued tts utterance).
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
  const msg = new SpeechSynthesisUtterance(cleanedContent);
  window.speechSynthesis.speak(msg);

  // TODO: move fcn declaration to root of file
  const beatToTimeInMilliseconds = (startingBeat, bpm) => {
    // startTime = 60 / bpm * startingBeat
    // convert to seconds, find start time, convert to milliseconds
    return 60 / bpm * startingBeat * 1000;
    // beats equation logic
      // if 60 bpm
        // beat 1 = 1 second
        // 60 / 60 * 1 = 1
        // beat 2 = 2 seconds
        // 60 / 60 * 2 = 2


      // if 30 bpm
        // beat 1 = 2 seconds
        // 60 / 30 * 1 = 2
        // beat 2 = 4 seconds
        // 60 / 30 * 2 = 4
      
      // if 120 bpm
        // beat 1 = .5 seconds
        // 60 / 120 * 1 = .5
        // beat 2 = 1 seconds
        // 60 / 120 * 2 = 1
  };

  let k = 0;
  let l = 0;
  // some random numbers. timing for this will be way off
  // because api offers unpredictable end times for speech
  // TODO: is pitch variable during pause? No.
  // is rate variable?
  const whenToSpeakBeats = [0,0, 1,1];
  const pitches = [.5, 2];
  const rates = [.3, 1];
  // const whenToSpeakBeats = [0,.5,1,1.5,4,5,6,7];
  // const whenToSpeakBeats = [1,0,3,1,0,0,0];
  // const whenToSpeakBeats = [0,.5,.5,.5,.5,.5,.5];
  const howLongToSpeakBeats = [1,1,1,1,1,1,1];
  const words = cleanedContent.split(" ");
  // const msg = new SpeechSynthesisUtterance(cleanedContent);

  const callback = (j) => {
    const jIndex = j % whenToSpeakBeats.length;
    const kIndex = k % pitches.length;
    const lIndex = l % rates.length;
    // const duration = howLongToSpeakBeats[index];
    const startTime = whenToSpeakBeats[jIndex];
    msg.pitch = pitches[kIndex];
    msg.rate = rates[lIndex];
    setTimeout(
      () => {
        window.speechSynthesis.resume();
      },
      beatToTimeInMilliseconds(startTime, bpm)
    );
  };
  
  let j = 0;
  // TODO: note that this approach means it's not possible to split a word
  msg.onpause = (e) => {
    
    msg.pitch = 2;
    e.target.pitch = 2;
    e.currentTarget.pitch = 2;
    e.srcElement.pitch = 2;
  };

  msg.onboundary = (e) => {
    const s = "";
    let prevIndex =
    s.substring()
    cleanedContent.sub e.charIndex, cleanedContent.length
    window.speechSynthesis.pause();

    console.log(e);
    callback(j);
    j++;
  };
}

export {
  voiceClickEventListener,
  setBpm,
}

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

  const cleanContent = (content) => {
    return content;
  }

  const cleanedContent = cleanContent(allContent);
  // const msg = new SpeechSynthesisUtterance(cleanedContent);
  // window.speechSynthesis.speak(msg);

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

  let j = 0;
  let k = 0;
  let l = 0;
  const whenToSpeakBeats = [0,1,2,3];
  // const whenToSpeakBeats = [0,0, 1,1];
  const pitches = [.5, 2];
  const rates = [.3, 1];
  // some random numbers. timing for this will be way off
  // because api offers unpredictable end times for speech
  // TODO: is pitch variable during pause? No.
  // is rate variable?
  const msg = new SpeechSynthesisUtterance(cleanedContent);
  msg.onboundary = (e) => {
    window.speechSynthesis.pause();

    const jIndex = j % whenToSpeakBeats.length;
    const kIndex = k % pitches.length;
    const lIndex = l % rates.length;
    e.utterance.pitch = pitches[kIndex];
    e.utterance.rate = rates[lIndex];
    setTimeout(
      () => {
        window.speechSynthesis.resume();
      },
      beatToTimeInMilliseconds(whenToSpeakBeats[jIndex])
    );

    j++;
    k++;
    l++;
  };

  // const whenToSpeakBeats = [0,.5,1,1.5,4,5,6,7];
  // const whenToSpeakBeats = [1,0,3,1,0,0,0];
  // const whenToSpeakBeats = [0,.5,.5,.5,.5,.5,.5];
  const howLongToSpeakBeats = [1,1,1,1,1,1,1];
  const words = cleanedContent.split(" ");
  // let msg;
  // let msgs = [];
  // let isSpeaking = false;
  // let i = 0;

  for (let i = 0; i < words.length; i++) {
    const jIndex = j % whenToSpeakBeats.length;
    const content = words.slice(i).join(" ");
    console.log(content);
    const msg = new SpeechSynthesisUtterance(content);
    // msgs.push(msg);
    // schedule utterance
    setTimeout(
      () => {
        // TODO: note that this approach means it's not possible to split a word
        msg.onboundary = (e) => {
          window.speechSynthesis.pause();
        };
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
        // isSpeaking = true;
      },
      beatToTimeInMilliseconds(whenToSpeakBeats[jIndex], bpm)
    );

    j++;
  }

  
}

export {
  voiceClickEventListener,
  setBpm,
}

let bps;
const setBps = (newBps) => {
  bps = newBps;
};
let setPattern;
const setSetPattern = (SetPattern) => {
  setPattern = SetPattern;
};

const speakIds = [];
let setPatternId;
const setPatternIds = [];

var reset = () => {
  // Cancel timeouts that will schedule other utterances.
  for (let id of speakIds) {
    clearTimeout(id);
  }
  // Cancel intervals that will schedule more beats.
  // Scheduling beats and cancelling them live here because
  // the beat is only necessary while there is singing.
  for (let id of setPatternIds) {
    clearInterval(id);
  }
  // Audio play doesn't always work because the queue gets stuck sometimes.
  // Cancel currently playing speechSynthesis until it stops speaking
  // (one cancel per queued tts utterance).
  while (window.speechSynthesis.speaking) {

    window.speechSynthesis.cancel();
  }
};
//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song
const voiceClickEventListener = (e) => {
  // prevent overlapping voices
  reset();

  const currentElement = document.elementFromPoint(e.clientX, e.clientY);
  const allContent = currentElement.innerText;

  const cleanContent = (content) => {
    return content;
  }

  const cleanedContent = cleanContent(allContent);

  // TODO: move fcn declaration to root of file
  const beatToTimeInMilliseconds = (startingBeat, bps) => {
    // startTime = 60 / bpm * startingBeat
    // convert to seconds, find start time, convert to milliseconds
    return startingBeat / bps * 1000;
    // return bps * startingBeat * 1000;
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

  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;
  const words = cleanedContent.split(" ");
  const whenToSpeakBeats = [0,1,1,1];
  const pitches = [.5, 2];
  const rates = [1.5];
  // const rates = [1.3, 1.8];
  // some random numbers. timing for this will be way off
  // because api offers unpredictable end times for speech
  // TODO: is pitch variable during pause? No.
  // is rate variable?
  const setupId = setInterval(() => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
        clearInterval(setupId);
        completeSetup(voices);
    }
  }, 10);

  const completeSetup = (voices) => {
    const voicesByName = {};
    for (let i = 0; i < voices.length; i++) {
      voicesByName[voices[i].name] = voices[i];
    }
    let y = 0;
    setPattern();
    setPatternId = setInterval(
      () => {
        if (y >= 4) {
          clearInterval(setPatternId);
        }
        setPattern();
        y++;
      },
      bps * 4000
    );
    setPatternIds.push(setPatternId);

    for (let word of words) {
      const msg = new SpeechSynthesisUtterance(word);
  
      const jIndex = j % whenToSpeakBeats.length;
      const kIndex = k % pitches.length;
      const lIndex = l % rates.length;
  
      
      // Trinoids sounds horrible
      // Whisper sounds the best
      // Wobble is really interesting, I like it.
      // Zarvox sounds robotic and slightly bouncy, but works well.
      // const voice = voicesByName["Trinoids"];
      const voice = voicesByName["Whisper"];
      // const voice = voicesByName["Wobble"];
      // const voice = voicesByName["Zarvox"];
      msg.voice = voice;
      msg.pitch = pitches[kIndex];
      msg.rate = rates[lIndex] / bps;
  
      speakIds.push(
        setTimeout(
          () => {
            window.speechSynthesis.speak(msg);
          },
          beatToTimeInMilliseconds(whenToSpeakBeats[jIndex] + j, bps)
        )
      );
  
      j++;
      k++;
      l++;
    }
  }
};

export {
  voiceClickEventListener,
  setBps,
  setSetPattern,
  reset
}

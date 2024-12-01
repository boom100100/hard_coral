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
  // const pitches = [.5,.5,2,.5];
  const pitches = [1];
  // const rates = [.25,.25,.25,1,1,1,1,.25,]
  // Note: all rate changes affect how many beat loops should be queued.
  const rates = [1.25, 1.25, .5, 1.25, 1.25, 1.25, 1.25, .5];
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

    // set another _ seconds of bass rhythm for every n words
    let z = 0;
    let wordsPerBeatInterval = bps < .75 ? 
      3.4 :
      bps <= 2 ? 
      3 :
      2.8 ; // TODO: this calculation is not very precise. Overall needed attern length must be derived from a calculation of the time needed to say each word at a given rate, starting at a specific startTime.
    let loopDuration = 4 / bps; // how frequently the pattern should loop: calculated as expected duration of pattern (from getPattern) divided by bps
    setPattern();
    setPatternId = setInterval(
      () => {
        if (z > words.length / wordsPerBeatInterval) {
          clearInterval(setPatternId);
          return;
        }
        setPattern();
        z++;
      },
      loopDuration * 1000
    );
    setPatternIds.push(setPatternId);

    for (let word of words) {
      const msg = new SpeechSynthesisUtterance(word);
  
      const jIndex = j % whenToSpeakBeats.length;
      const kIndex = k % pitches.length;
      const lIndex = l % rates.length;
  
      // const voice = voicesByName["Aaron"]; // 
      // const voice = voicesByName["Daniel (English (United Kingdom))"]; // 
      // const voice = voicesByName["Eddy (English (United States))"]; // 
      // const voice = voicesByName["Ellen"]; // 
      // const voice = voicesByName["Fred"]; // 
      // const voice = voicesByName["Gordon"]; // 
      // const voice = voicesByName["Grandma (English (United Kingdom))"]; // 
      // const voice = voicesByName["Grandma (English (United States))"]; // 
      // const voice = voicesByName["Grandpa (English (United Kingdom))"]; // 
      // const voice = voicesByName["Grandpa (English (United States))"]; // 
      // const voice = voicesByName["Joana"]; // 
      // const voice = voicesByName["Junior"]; // 
      // const voice = voicesByName["Kanya"]; // 
      // const voice = voicesByName["Li-Mu"]; // 
      // const voice = voicesByName["Luciana"]; // 
      // const voice = voicesByName["Marie"]; // 
      // const voice = voicesByName["Martha"]; // 
      // const voice = voicesByName["Milena"]; // 
      // const voice = voicesByName["Moira"]; // 
      // const voice = voicesByName["Ralph"]; // 
      // const voice = voicesByName["Reed (English (United Kingdom))"]; // 
      // const voice = voicesByName["Reed (English (United States))"]; // 
      // const voice = voicesByName["Rishi"]; // liked, is deep, can vary  pitch
      // const voice = voicesByName["Rocko (English (United Kingdom))"]; // 
      const voice = voicesByName["Rocko (English (United States))"]; // 
      // const voice = voicesByName["Satu"]; // 
      // const voice = voicesByName["Shelley (English (United Kingdom))"]; // 
      // const voice = voicesByName["Shelley (English (United States))"]; // 
      // const voice = voicesByName["Sinji"]; // 
      // const voice = voicesByName["Superstar"]; // 
      // const voice = voicesByName["Tessa"]; // 
      // const voice = voicesByName["Xander"]; // 
      // const voice = voicesByName["Yelda"]; // 
      // const voice = voicesByName["Zosia"]; // 
      // const voice = voicesByName["Zuzana"]; //
      
      // can the pitch for the voice vary?
      // const voice = voicesByName["Albert"]; // y
      // const voice = voicesByName["Bells"]; // n
      // const voice = voicesByName["Boing"]; // y
      // const voice = voicesByName["Cellos"]; // y
      // const voice = voicesByName["Jester"]; // n
      // const voice = voicesByName["Kyoko"]; // y
      // const voice = voicesByName["O-Ren"]; // y
      // const voice = voicesByName["Organ"]; // y
      // Trinoids sounds horrible
      // Albert sounds horrible over drums
      // Boing sounds horrible over drums
      // Organ sounds horrible over drums
      // Whisper sounds the best
      // Wobble is really interesting, I like it.
      // Zarvox sounds robotic and slightly bouncy, but works well.
      // const voice = voicesByName["Trinoids"]; // y
      // const voice = voicesByName["Whisper"]; // n
      // const voice = voicesByName["Wobble"]; // not sure, seems like no
      // const voice = voicesByName["Zarvox"]; // y
      msg.voice = voice;
      const isShort = msg.text.length <= 3;
      const isLong = msg.text.length > 10;
      msg.pitch = isShort ?
        1 :
        isLong ? .5: pitches[kIndex];
      // msg.rate = rates[lIndex];
      msg.rate = isShort ?
        1.5 * bps :
        isLong ? .5 * bps: rates[lIndex] * bps;
      
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

let getBps;
const setGetBps = (newGetBps) => {
  getBps = newGetBps;
};

let voiceUriToNotePitchMapping;
const setMapping = (newVoiceUriToNotePitchMapping) => {
  voiceUriToNotePitchMapping = newVoiceUriToNotePitchMapping;
};

let selectedVoiceURI;
const setSelectedVoiceURI = (newSelectedVoice) => {
  selectedVoiceURI = newSelectedVoice;
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
  // Cancel currently playing speechSynthesis until it stops speaking.
  while (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
};

const voiceClickEventListener = (e) => {
  // prevent overlapping voices
  reset();

  const currentElement = document.elementFromPoint(e.clientX, e.clientY);
  const bps = getBps();
  const cleanContent = (content) => {
    return content;
  }

  const cleanedContent = cleanContent(currentElement.innerText);

  // TODO: move fcn declaration to root of file
  const beatToTimeInMilliseconds = (startingBeat, bps) => {
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

  const setupId = setInterval(() => {
    // This interval is required to wait for the async function `getVoices` to resolve
    const voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
        clearInterval(setupId);
        completeSetup(voices);
    }
  }, 10);

  const completeSetup = (voices) => {
    const voicesByUri = {};
    for (let i = 0; i < voices.length; i++) {
      voicesByUri[voices[i].voiceURI] = voices[i];
    }

    let j = 0;
    let k = 0;
    let l = 0;
    const words = cleanedContent.split(" ");
    const wordCount = words.length;
    let spokenWordsCount = 0;

    // how frequently the pattern should loop: (beats in pattern [from getPattern]) / bps
    let loopDuration = 4 / bps;
    setPattern();
    setPatternId = setInterval(
      () => {
        // Stop adding to the pattern duration after all words are spoken.
        if (wordCount === spokenWordsCount) {
          clearInterval(setPatternId);
          return;
        }
        setPattern();
      },
      loopDuration * 1000
    );
    setPatternIds.push(setPatternId);

    const notePitchMapping = voiceUriToNotePitchMapping[selectedVoiceURI];
    const getPitch = (note) => notePitchMapping[note] ?? 1;
    const voice = voicesByUri[selectedVoiceURI];

    const whenToSpeakBeats = [0];
    const pitches = [
      getPitch("C3"), getPitch("D3"), getPitch("E3"), getPitch("F3"), 
      getPitch("G3"), getPitch("A3"), getPitch("B3"), getPitch("C4"), 
    ];
    const rates = [1];
    // TODO: is pitch variable during pause? No.
    // is rate variable?

    for (let word of words) {
      const msg = new SpeechSynthesisUtterance(word);
      msg.addEventListener("end", (_) => spokenWordsCount++);
  
      const jIndex = j % whenToSpeakBeats.length;
      const kIndex = k % pitches.length;
      const lIndex = l % rates.length;
      msg.voice = voice;
      msg.pitch = pitches[kIndex];
      msg.rate = rates[lIndex] * bps;

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
  setGetBps,
  setMapping,
  setSelectedVoiceURI,
  setSetPattern,
  reset
}

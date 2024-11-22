let bpm;
const setBpm = (newBpm) => {
  bpm = newBpm;
};

//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song
const voiceClickEventListener = (e) => {
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
  const msg = new SpeechSynthesisUtterance(cleanedContent);
  window.speechSynthesis.speak(msg);
  window.speechSynthesis.pause();
  // window.speechSynthesis.resume();
  // window.speechSynthesis.pause();
  // window.speechSynthesis.resume();



  const beatToTimeInMilliseconds = (startingBeat, bpm) => {
    // startTime = 60 / bpm * startingBeat
    // convert to seconds, find start time, convert to milliseconds
    return 60 / bpm * startingBeat * 1000;
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
  const whenToSpeakBeats = [0,3,4,5,6,8,10];
  const howLongToSpeakBeats = [1,1,1,1,1,1,1];
  while (window.speechSynthesis.pending && j < whenToSpeakBeats.length) {
    const startTime = whenToSpeakBeats[j];
    const duration = howLongToSpeakBeats[j];
    setTimeout(
      () => {
        window.speechSynthesis.resume();
      },
      beatToTimeInMilliseconds(startTime, bpm)
    );

    setTimeout(
      () => {
        window.speechSynthesis.pause();
      },
      beatToTimeInMilliseconds(startTime + duration, bpm)
    );
    j++;
  }
    


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
  //   // window.speechSynthesis.speak(msg);
  //   // window.speechSynthesis.pause();





  //   // schedule when to speak
  //   const elapsedTime = 0;
  //   const duration = 10; // seconds, can be fractions/irrational numbers
  //   // 10 seconds = 10 beats
  //   // const rate = 60 / bpm;
  //   let j = 0;
  //   const whenToSpeakBeats = [0,3,4,5,6,8,10];
  //   while (elapsedTime < duration) {
  //     setTimeout(
  //       () => {
  //         // can pause instead
  //         // window.speechSynthesis.pause();
  //         // schedule speech start time, probably best for individual words
  //         // this places speech in the queue, it can't actually control when the speech will start
  //         // but cancelling the current running utterance will let this one run now
  //         window.speechSynthesis.pause();
  //   window.speechSynthesis.resume();

  //         window.speechSynthesis.cancel();
  //         window.speechSynthesis.speak(msg);
  //       },
  //       startTimeOfBeatMilliseconds(whenToSpeakBeats[j], bpm)
  //     );
  //     elapsedTime++;
  //     j++;
  //   }
  //   i++;
  // }
}

export {
  voiceClickEventListener,
  setBpm,
}

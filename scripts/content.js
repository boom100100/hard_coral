console.log("Extension has run.");

var addListeners = (clickEventListener, mouseMoveEventListener) => {
  // listener that styles hovered element and saves its text
  document.addEventListener('mousemove', mouseMoveEventListener);
  
  // listener that triggers playing text to speech on click ~(mouseup, actually)~ event
  document.body.addEventListener('click', clickEventListener, true); 
};

var bongoDrums = () => {

  const drumConstructor = (frequencyValue) => {
    // // one context per document
    // var context = new (window.AudioContext || window.webkitAudioContext)();
    // var osc = context.createOscillator(); // instantiate an oscillator
    // osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    // osc.frequency.value = frequencyValue; // Hz
    // let compressor = context.createDynamicsCompressor();
    // // let sm = context.createBiquadFilter();
    // compressor.attack.value = .1;
    // compressor.knee.value = 10;
    // compressor.threshold.value = -40;
    // // osc.detune.value = -1000;
    // console.log(compressor.knee.value,compressor.attack.defaultValue);
    // osc.connect(compressor).connect(context.destination); // connect it to the destination
    // osc.start(); // start the oscillator
    // osc.stop(context.currentTime + .1);

    // one context per document
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 35; // Hz
    let compressor = context.createDynamicsCompressor();
    compressor.attack.value = .1;
    compressor.knee.value = 10;
    compressor.threshold.value = -80;
    // osc.detune.value = 600;
console.log(compressor.knee.value,compressor.attack.defaultValue);
// let gainNode = context.createGain();
// gainNode.gain.value = 2;
// gainNode.gain.exponentialRampToValueAtTime(2, context.currentTime + 1);
    const biq = context.createBiquadFilter();
biq.type = "notch";
//"highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"
    // biq.gain.value = .5;
    osc
        .connect(compressor)
        .connect(biq)
        // .connect(gainNode)
.connect(context.destination); // connect it to the destination
    osc.start(); // start the oscillator
    osc.stop(context.currentTime + 2);
console.log(gainNode.gain.automationRate);


    return osc;
  }

  const bongo = {};

  bongo.macho = drumConstructor(300);
  bongo.henbra = drumConstructor(380);

  return bongo;
}

if ('speechSynthesis' in window) {
  console.log('is supported');

  (async () => {
    const src = chrome.runtime.getURL("scripts/listeners.js");
    const listeners = await import(src);
    const {clickEventListener, mouseMoveEventListener} = listeners;
    addListeners(clickEventListener, mouseMoveEventListener);
  })();
 } else {
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }

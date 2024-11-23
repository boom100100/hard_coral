var context = new (window.AudioContext || window.webkitAudioContext)();
var merger = context.createChannelMerger(2);
merger.connect(context.destination);
var createBongoDrums = () => {

  var drumConstructor = (frequencyValue, mergerChannelNumber) => {
    // one context per document
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = frequencyValue; // Hz

    var compressor = context.createDynamicsCompressor();
    compressor.attack.value = .1;
    compressor.threshold.value = -40;

    var volume = context.createGain();
    volume.gain.value = 1;

    osc
      .connect(compressor)
      .connect(volume)
      .connect(merger, 0, mergerChannelNumber);

    return osc;
  }

  var bongo = {
    macho: () => drumConstructor(150, 0),
    hembra: () => drumConstructor(380, 1),
  };

  return bongo;
};

var bongo = createBongoDrums();
var bpm = 60;
var pattern = {
  macho: {
    createOscillator: bongo.macho,
    times: [
      {startTimeOffset: 0, endTime: .03}, // offsetBeat. rename?
      {startTimeOffset: .5, endTime: .03},
      {startTimeOffset: 2, endTime: .03},
      {startTimeOffset: 2.5, endTime: .03},
    ]
  },
  hembra: {
    createOscillator: bongo.hembra,
    times: [
        {startTimeOffset: 1, endTime: .03},
        {startTimeOffset: 3, endTime: .03},
    ]
  },
};
var oscillators = [];
var setPattern = () => {
  for (let k in pattern) {
    console.log(k);
    var times = pattern[k].times;
    for (let time of times) {
        console.log(time);
        var oscillator = pattern[k].createOscillator();
        oscillators.push(oscillator);
        oscillator.start(context.currentTime + time.startTimeOffset);
        oscillator.stop(context.currentTime + time.startTimeOffset + time.endTime);
    }
  }
};

var reset = () => {
  for (let o of oscillators) {
    o.stop(context.currentTime);
  }
};

var musicClickEventListener = (e) => {
  // prevent overlapping beats
  reset();
  setPattern();
};

export {
  musicClickEventListener,
  bpm,
  setPattern,
  reset,
}

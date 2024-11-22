var createBongoDrums = () => {

  var drumConstructor = (frequencyValue) => {
    // one context per document
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 380; // Hz

    var compressor = context.createDynamicsCompressor();
    compressor.attack.value = .1;
    compressor.threshold.value = -40;

    osc
      .connect(compressor)
      .connect(context.destination); // connect it to the destination

    return osc;
  }
    
  var bongo = {
    macho: drumConstructor(150),
    hembra: drumConstructor(380),
  };

  return bongo;
}

var bongo = createBongoDrums();

var pattern = {
  macho: {
    osc: bongo.macho,
    times: [
      {startTimeOffset: 0, endTime: .1},
      {startTimeOffset: 1, endTime: .1},
      {startTimeOffset: 2, endTime: .1},
    ]
  },
  hembra: {
    osc: bongo.hembra,
    times: [
        {startTimeOffset: .5, endTime: .1},
        {startTimeOffset: 1.5, endTime: .1},
    ]
  },
}

var setPattern = (pattern) => {
  for (let k in pattern) {
    var drumOscillator = pattern[k].osc;
    var times = pattern[k].times;
    for (let time of times) {

      drumOscillator.start(); // start the oscillator
      // osc.stop(context.currentTime + .03);
      drumOscillator.stop(context.currentTime + time.startTimeOffset + time.endTime);
    }
  }
}

var musicClickEventListener = (e) => {
  setPattern(pattern);
};

export {
  musicClickEventListener
}

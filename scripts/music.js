var context = new (window.AudioContext || window.webkitAudioContext)();
var merger = context.createChannelMerger(2);
merger.connect(context.destination);

var bongo;
var setBongoDrums = (drums) => {
  bongo = drums;
};

var bpm = 60;
var getBps = () => 60 / bpm;

var timeoutIds = [];
var constructPlayback = (drumHead) => {
  return ({
    start: (startTime) => {
      timeoutIds.push(
        setTimeout(() => {
          drumHead.currentTime = 0;
          drumHead.play();
        }, startTime * 1000)
      );
    },
  });
};

var getPattern = () => {
  const bps = getBps();
  return ({
    hembra: {
      ...constructPlayback(bongo.hembra),
      times: [
        {startTimeOffset: bps * 0},
        {startTimeOffset: bps * .5},
        {startTimeOffset: bps * 2},
        {startTimeOffset: bps * 2.5},
      ]
    },
    macho: {
      ...constructPlayback(bongo.macho),
      times: [
          {startTimeOffset: bps * 1},
          {startTimeOffset: bps * 3},
      ]
    },
  });
};
var setPattern = () => {
  const pattern = getPattern();
  for (let drumNameKey in pattern) {
  const bongoDrum = pattern[drumNameKey];
  // bongoDrum.load();
    var times = bongoDrum.times;
    for (let time of times) {
      bongoDrum.start(time.startTimeOffset);
    }
  }
};

var reset = () => {
  for (let id of timeoutIds) {
    clearTimeout(id);
  }
  for (const drumNameKey in bongo) {
    bongo[drumNameKey].pause();
    bongo[drumNameKey].currentTime = 0;
  }
};

var musicClickEventListener = (e) => {
  // prevent overlapping beats
  reset();
};

export {
  musicClickEventListener,
  bpm,
  getBps,
  setBongoDrums,
  setPattern,
  reset,
}

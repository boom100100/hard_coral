var context = new (window.AudioContext || window.webkitAudioContext)();
var merger = context.createChannelMerger(2);
merger.connect(context.destination);

var bongo;
var setBongoDrums = (drums) => {
  bongo = drums;
};

var bpm = 120;
var getBps = () => bpm / 60;

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
        // this offset equals beat / beat per seconds
        {startTimeOffset: 0 / bps},
        {startTimeOffset: .5 / bps},
        {startTimeOffset: .75 / bps},
        {startTimeOffset: 1.5 / bps},
        {startTimeOffset: 2 / bps},
        {startTimeOffset: 2.75 / bps},
        {startTimeOffset: 3.5 / bps},
      ]
    },
    macho: {
      ...constructPlayback(bongo.macho),
      times: [
          {startTimeOffset: .25 / bps},
          {startTimeOffset: 1 / bps},
          {startTimeOffset: 1.25 / bps},
          {startTimeOffset: 1.75 / bps},
          {startTimeOffset: 2.25 / bps},
          {startTimeOffset: 2.5 / bps},
          {startTimeOffset: 3 / bps},
          {startTimeOffset: 3.25 / bps},
          {startTimeOffset: 3.75 / bps},
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

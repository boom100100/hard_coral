// TODO: when adding other pitched voices, cross-reference which notes are common between all voices.
// Then, make the singing implementation only use those common notes.
const goodNewsNoteToPitchMapping = {
  // Anything lower than .5 comes back as "B2"
  "B2": .5,
  "C3": .528,
  "C#3": .555,
  "Db3": .555,
  "D3": .595,
  "D#3": .628,
  "Eb3": .628,
  "E3": .66,
  "F3": .708,
  "F#3": .744,
  "Gb3": .744,
  "G3": .79,
  "G#3": .84,
  "Ab3": .84,
  "A3": .886,
  "A#3": .94,
  "Bb3": .94,
  "B3": 1,
  "C4": 1.057,
  "C#4": 1.12,
  "Db4": 1.12,
  "D4": 1.18,
  "D#4": 1.25,
  "Eb4": 1.25,
  "E4": 1.33,
  "F4": 1.4,
  "F#4": 1.48,
  "Gb4": 1.48,
  "G4": 1.58,
  "G#4": 1.68,
  "Ab4": 1.68,
  "A4": 1.78,
  "A#4": 1.89,
  "Bb4": 1.89,
  "B4": 2,
};

const whisperNoteToPitchMapping = {};

const goodNewsURI = "Good News";
const whisperURI = "Whisper";

const voiceUriToNotePitchMapping = {
  [goodNewsURI]: goodNewsNoteToPitchMapping,
  [whisperURI]: whisperNoteToPitchMapping,
  // TODO: more voices
  // "Bad News": null,
  // "Cellos": null,
  // "Kathy": null,

  // probably won't do these
    // "Ellen",
    // "Reed (English (United States))", // reed is more monotonous in a whole sentence, but it sounds slightly more like a machine. See if one works better than the other in practice.
    // "Shelly (English (United States))",
};

const voiceOptions = [
  whisperURI,
  goodNewsURI,
];

export {
  voiceOptions,
  voiceUriToNotePitchMapping,
}

let voiceOptions;
const setVoiceOptions = (newVoiceOptions) => {
  voiceOptions = newVoiceOptions;
};

let selectedVoiceURI;
let setSelectedVoiceURI;
const setSetSelectedVoiceURI = (newSelectedVoiceURI) => {
  setSelectedVoiceURI = newSelectedVoiceURI;
};
const onChangeHandlerSelectVoice = (e) => {
  selectedVoiceURI = e.target.value;  
  setSelectedVoiceURI(selectedVoiceURI);
};

const bpmRange = [10, 200]; // Should this be set here? `music.js` might be the best place for that.
let bpm = 60;
let setBpm;
const setSetBpm = (newSetBpm) => {
  setBpm = newSetBpm;
  setBpm(bpm);
};
const onChangeHandlerSelectBpm = (e) => {
  bpm = e.target.value;
  setBpm(bpm);
};

const extensionDrawer = document.createElement("div");
extensionDrawer.id = "96005210-8bc2-48ca-9b13-5818a7a9be20";
const extensionDrawerHideable = document.createElement("div");

const extensionDrawerTitle = document.createElement("div");
extensionDrawerTitle.innerText = "Hard Coral";

const extensionDrawerHideShowToggleButton = document.createElement("button"); // hamburger
extensionDrawerHideShowToggleButton.innerText = "Settings Toggle";
extensionDrawerHideShowToggleButton.addEventListener("click", (_) => {
  switch (extensionDrawerHideable.style.display) {
    case "none":
      extensionDrawerHideable.style.display = "block";
      break;
    case "block":
    default:
        extensionDrawerHideable.style.display = "none";
        break;
  }
});

const extensionDrawerVoiceSelector = document.createElement("select");
extensionDrawerVoiceSelector.addEventListener("change", onChangeHandlerSelectVoice);
extensionDrawerVoiceSelector.name = "voice-selector";
extensionDrawerVoiceSelector.id = "voice-selector";
extensionDrawerVoiceSelector.style.width = "300px";
extensionDrawerVoiceSelector.style.display = "block";

const setupId = setInterval(() => {
  if (voiceOptions.length !== 0) {
      clearInterval(setupId);
      completeSetup(voiceOptions);
  }
}, 10);

const completeSetup = (voiceOptions) => {
  selectedVoiceURI = voiceOptions[0];
  setSelectedVoiceURI(selectedVoiceURI);

  const extensionDrawerVoiceSelectorOptions = voiceOptions.map(voiceURI => {
      const option = document.createElement("option");
      option.value = voiceURI;
      option.innerText = voiceURI;
      return option;
  });
  
  for (let option of extensionDrawerVoiceSelectorOptions) {
      extensionDrawerVoiceSelector.appendChild(option);
  }
  
  const extensionDrawerBpmSelector = document.createElement("input");
  extensionDrawerBpmSelector.addEventListener("change", onChangeHandlerSelectBpm);
  extensionDrawerBpmSelector.style.display = "block";
  extensionDrawerBpmSelector.style.width = "300px";
  extensionDrawerBpmSelector.type = "range";
  extensionDrawerBpmSelector.id = "bpm";
  extensionDrawerBpmSelector.name = "bpm";
  extensionDrawerBpmSelector.value = bpm;
  extensionDrawerBpmSelector.min = bpmRange[0];
  extensionDrawerBpmSelector.max = bpmRange[1];
  
  extensionDrawer.appendChild(extensionDrawerHideShowToggleButton);
  
  for (let futureChild of [
    extensionDrawerTitle,
    extensionDrawerVoiceSelector,
    extensionDrawerBpmSelector,
  ]) {
      extensionDrawerHideable.appendChild(futureChild);
      
  }
  
  const body = document.body;
  extensionDrawer.appendChild(extensionDrawerHideable);
  body.insertBefore(extensionDrawer, body.children[0]);
};


export {
    selectedVoiceURI,
    setSetBpm,
    setSetSelectedVoiceURI,
    setVoiceOptions,
    extensionDrawer,
}

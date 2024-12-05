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

let extensionDrawerBpmSelector;
let extensionDrawerBpmSelectorText;
let extensionDrawerBpmSelectorLabel;
let extensionDrawerBpmSelectorLabelDivInner;
const bpmInnerText = "Beats Per Minute (BPM)";
const onChangeHandlerSelectBpm = (e) => {
  bpm = e.target.value;
  setBpm(bpm);
  extensionDrawerBpmSelector.value = bpm;
  extensionDrawerBpmSelectorText.value = bpm;
  extensionDrawerBpmSelectorLabelDivInner.appendChild(extensionDrawerBpmSelector);
  extensionDrawerBpmSelectorLabelDivInner.appendChild(extensionDrawerBpmSelectorText);
  extensionDrawerBpmSelectorLabel.appendChild(extensionDrawerBpmSelectorLabelDivInner);
};

const extensionDrawer = document.createElement("div");
extensionDrawer.id = "96005210-8bc2-48ca-9b13-5818a7a9be20";
extensionDrawer.style.margin = "20px";
extensionDrawer.style.display = "flex";
extensionDrawer.style.flexFlow = "row wrap";
extensionDrawer.style.justifyContent = "space-between";

const extensionDrawerHideableSettings = document.createElement("div");
const extensionDrawerHideableInstructions = document.createElement("div");
extensionDrawerHideableSettings.style.display = "flex";
extensionDrawerHideableSettings.style.flexDirection = "column";
extensionDrawerHideableSettings.style.gap = "20px";
extensionDrawerHideableSettings.style.minWidth = "300px";
extensionDrawerHideableSettings.style.maxWidth = "300px";

const extensionDrawerTitle = document.createElement("div");
extensionDrawerTitle.innerText = "Hard Coral\n\n\nSettings\n";
extensionDrawerHideableInstructions.innerText = "Instructions\n\nPoint and click at the text you would like to hear.\n\nDouble-click a link or button to trigger it.\n\nDeactivate the extension by clicking the extension icon to reset single-click action on links and buttons.";
extensionDrawerHideableInstructions.style.minWidth = "300px";
extensionDrawerHideableInstructions.style.maxWidth = "300px";

const extensionDrawerHideShowToggleButton = document.createElement("button"); // hamburger
extensionDrawerHideShowToggleButton.innerText = "Settings Toggle";
extensionDrawerHideShowToggleButton.style.height = "30px";
extensionDrawerHideShowToggleButton.style.minWidth = "120px";
extensionDrawerHideShowToggleButton.style.maxWidth = "120px";
extensionDrawerHideShowToggleButton.style.background = "white";
extensionDrawerHideShowToggleButton.style.color = "black";
extensionDrawerHideShowToggleButton.style.border = "none";
extensionDrawerHideShowToggleButton.style.borderBottom = "1px solid black";
extensionDrawerHideShowToggleButton.addEventListener("click", (_) => {
  switch (extensionDrawerHideableSettings.style.visibility) {
    case "hidden":
      extensionDrawerHideableInstructions.style.visibility = "";
      extensionDrawerHideableInstructions.style.height = "auto";
      extensionDrawerHideableSettings.style.visibility = "";
      extensionDrawerHideableSettings.style.height = "auto";
      break;
    case "":
    default:
      extensionDrawerHideableInstructions.style.visibility = "hidden";
      extensionDrawerHideableInstructions.style.height = "0px";
      extensionDrawerHideableSettings.style.visibility = "hidden";
      extensionDrawerHideableSettings.style.height = "0px";
      break;
  }
});

const extensionDrawerVoiceSelector = document.createElement("select");
const extensionDrawerVoiceSelectorLabel = document.createElement("label");
extensionDrawerVoiceSelectorLabel.innerText = "Voice";
extensionDrawerVoiceSelector.addEventListener("change", onChangeHandlerSelectVoice);
extensionDrawerVoiceSelector.name = "voice-selector";
extensionDrawerVoiceSelector.style.background = "white";
extensionDrawerVoiceSelector.style.color = "black";
extensionDrawerVoiceSelector.id = "voice-selector";
extensionDrawerVoiceSelector.style.border = "none";
extensionDrawerVoiceSelector.style.borderBottom = "1px solid black";
extensionDrawerVoiceSelector.style.display = "block";
extensionDrawerVoiceSelector.style.width = "300px";
extensionDrawerVoiceSelectorLabel.appendChild(extensionDrawerVoiceSelector);

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
  
  extensionDrawerBpmSelector = document.createElement("input");
  extensionDrawerBpmSelectorText = document.createElement("input");
  extensionDrawerBpmSelectorLabel = document.createElement("label");
  extensionDrawerBpmSelectorLabel.innerText = bpmInnerText;
  extensionDrawerBpmSelectorLabelDivInner = document.createElement("div");
  extensionDrawerBpmSelectorLabelDivInner.style.display = "flex";
  extensionDrawerBpmSelectorLabelDivInner.style.justifyContent = "space-between";
  extensionDrawerBpmSelectorLabelDivInner.style.width = "300px";
  extensionDrawerBpmSelector.addEventListener("change", onChangeHandlerSelectBpm);
  extensionDrawerBpmSelectorText.addEventListener("change", onChangeHandlerSelectBpm);
  extensionDrawerBpmSelector.style.display = "block";
  extensionDrawerBpmSelector.style.width = "200px";
  extensionDrawerBpmSelectorText.style.width = "75px";
  extensionDrawerBpmSelector.type = "range";
  extensionDrawerBpmSelectorText.type = "text";
  extensionDrawerBpmSelector.id = "bpm";
  extensionDrawerBpmSelector.name = "bpm";
  extensionDrawerBpmSelectorText.id = "bpm-text";
  extensionDrawerBpmSelectorText.name = "bpm-text";
  extensionDrawerBpmSelector.value = bpm;
  extensionDrawerBpmSelectorText.value = bpm;
  extensionDrawerBpmSelector.min = bpmRange[0];
  extensionDrawerBpmSelector.max = bpmRange[1];
  extensionDrawerBpmSelectorLabelDivInner.appendChild(extensionDrawerBpmSelector);
  extensionDrawerBpmSelectorLabelDivInner.appendChild(extensionDrawerBpmSelectorText);
  extensionDrawerBpmSelectorLabel.appendChild(extensionDrawerBpmSelectorLabelDivInner);
  
  for (let futureChild of [
    extensionDrawerTitle,
    extensionDrawerVoiceSelectorLabel,
    extensionDrawerBpmSelectorLabel,
  ]) {
      extensionDrawerHideableSettings.appendChild(futureChild);
      
  }
  
  const body = document.body;
  extensionDrawer.appendChild(extensionDrawerHideableSettings);
  extensionDrawer.appendChild(extensionDrawerHideableInstructions);
  extensionDrawer.appendChild(extensionDrawerHideShowToggleButton);
};

const append = () => {
  const body = document.body;
  body.insertBefore(extensionDrawer, body.children[0]);
};

const remove = () => {
  document.body.removeChild(extensionDrawer);
};

export {
  append,
  remove,
  selectedVoiceURI,
  setSetBpm,
  setSetSelectedVoiceURI,
  setVoiceOptions,
}

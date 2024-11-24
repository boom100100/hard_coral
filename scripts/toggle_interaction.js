var buttons;
var links;
const getEnabledButtons = () => {
    const buttonElements = document.querySelectorAll("button");
    const buttonElementObjectArray = [];
    buttonElements.forEach(e => {
        // if null or false
        if (e.attributes.getNamedItem("disabled") !== true) {
            buttonElementObjectArray.push(e);
        }
    });

    return buttonElementObjectArray;
};

const getLinks = () => {
// link will need to remove href
// but if the href is gone, how to id the link?
// and then maintain href somewhere when link is disabled
    const linkElements = document.querySelectorAll("a");
    const linkElementObjectArray = [];
    linkElements.forEach((e) => {
        linkElementObjectArray.push({
            element: e,
            originalHref: e.href
        });
    });

    return linkElementObjectArray;
};

const enableButtons = () => {
    buttons.forEach(e => e.toggleAttribute("disabled", false));
};
const enableLinks = () => {
    links.forEach(e => e.element.href = e.originalHref);
};

const disableButtons = () => {
    buttons.forEach(e => e.toggleAttribute("disabled", true));
};

const disableLinks = () => {
    links.forEach(e => e.element.href = "javascript:");
};

const disableInteraction = () => {
  // when extension loads, disable buttons and links

  const isDisabled = false;
  buttons = getEnabledButtons(isDisabled);
  links = getLinks();

  disableButtons();
  disableLinks();
};

const enableInteraction = () => {
  // when extension terminates, re-enable buttons and links
  
  enableButtons();
  enableLinks();
};

export {
    disableInteraction,
    enableInteraction,
}

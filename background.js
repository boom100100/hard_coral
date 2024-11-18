chrome.action.onClicked.addListener(async (tab) => {
    chrome.storage.sync.get("state", (data) => {
        if (data.state === "on") {
            chrome.storage.sync.set({state: "off"});
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                files: ["scripts/content.js"],
                
            });
        } else {
            chrome.storage.sync.set({state: "on"});
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                files: ["scripts/disable_content.js"],
                
            });
        }
    })
});

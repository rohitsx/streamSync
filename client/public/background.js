chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openNewTab") {
    chrome.tabs.create({ url: request.url });
  }
});
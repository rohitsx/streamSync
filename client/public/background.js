chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openNewTab") {
    chrome.tabs.create({ url: request.url });
  }
});

chrome.tabs.query({ currentWindow: true }, (tabs) => {
  tabs.forEach((tab) => {
      console.log(tab.url);
  });
});
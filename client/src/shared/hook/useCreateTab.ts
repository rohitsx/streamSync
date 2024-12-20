import { useNavigate } from "react-router-dom";

const useCreateTab = () => {
  const nav = useNavigate();

  const createTab = async (route: string) => {
    const url = chrome.runtime.getURL("index.html");
    const isPopupOpen = chrome.extension.getViews({ type: "popup" }).length > 0;
    let newTabId: null | string = null;

    if (isPopupOpen) {
      newTabId = await new Promise<string>((resolve, reject) => {
        chrome.tabs.create({ url: url + "#/" + route }, (tab) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(tab.id?.toString() ?? "");
          }
        });
      });
    } else {
      nav("/" + route);
    }

    return newTabId;
  };

  return createTab;
};

export default useCreateTab;

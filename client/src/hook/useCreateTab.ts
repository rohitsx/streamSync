import { useNavigate } from "react-router-dom";

const useCreateTab = () => {
  const nav = useNavigate();

  const createTab = (route: string) => {
    const url = chrome.runtime.getURL("index.html");
    const isPopupOpen = chrome.extension.getViews({ type: "popup" }).length > 0;

    if (isPopupOpen) {
      chrome.tabs.create({ url: url + "#/" + route });
    } else {
      nav("/" + route);
    }
  };

  return createTab;
};

export default useCreateTab;

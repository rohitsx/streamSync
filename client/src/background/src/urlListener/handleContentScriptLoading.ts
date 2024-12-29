import { handleContentScriptLoadingProp } from "@/types/bgType";
import checkIfLiveStream from "./checkIfLiveStream";
import axios from "axios";
import env from "@/config/enviroment";

export default async function handleContentScriptLoading(
  { tab, tabId }: handleContentScriptLoadingProp,
) {
  if (!tab.url || !tabId) return;

  const videoId = new URL(tab.url).searchParams.get("v");
  const isLive = await checkIfLiveStream(tab.url);

  const sendPageRnder = async () => {
    axios.post(
      `${env.api}check-stream`,
      videoId,
    ).then(() => chrome.tabs.sendMessage(tabId, { type: "page-rendered" }))
      .catch(() => console.error("no active stream"));
  };

  try {
    setTimeout(async () => {
      isLive
        ? sendPageRnder()
        : chrome.tabs.sendMessage(tabId, { type: "remove-render" });
    }, 800);
  } catch (err) {
    console.log("err", err);
  }
}

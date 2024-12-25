export interface MessageRequest {
  action: "googleLogin" | "youtubeAuth" | "addChatBox";
  clientId?: string;
  api?: string;
  host?: string;
  id?: string;
}

export interface MessageResponse {
  status?: string;
  success?: boolean;
}

export type MessageHandler = (
  request: MessageRequest,
  sendResponse: (response: MessageResponse) => void,
) => void;

export interface handleContentScriptLoadingProp {
  tabId?: number;
  tab: chrome.tabs.Tab;
}

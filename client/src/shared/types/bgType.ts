export interface AuthResponse {
  token: string;
  user: any;
}

export interface MessageRequest {
  action: string;
  userId? :string;
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

export interface HandleActionsProp {
  request: MessageRequest;
  sendResponse: (response: MessageResponse) => void;
}

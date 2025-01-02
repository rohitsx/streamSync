export interface CallProp {
  strangerUsername?: string | undefined;
  webSocket?: WebSocket;
}

export interface webRtcSignalingProp {
  host: string;
  stranger: string;
  description: RTCSessionDescription;
}

export interface iceCandidateProp {
  host: string;
  stranger: string;
  description: RTCIceCandidate;
}

export interface WsOnMessageProp {
  liveMessage: string;
  offer: webRtcSignalingProp;
  answer: webRtcSignalingProp;
  iceCandidate: iceCandidateProp;
}

import { createContext, useContext, ReactNode } from "react";

const PeerConnectionContext = createContext<RTCPeerConnection>(new RTCPeerConnection({ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }));

export default function usePcContext(): RTCPeerConnection {
    const context = useContext(PeerConnectionContext);
    if (context === undefined) throw new Error('useSocketContext must be used within a SocketProvider');
    return context;
}

export function PeerConnectionProvider({ children }: { children: ReactNode }) {
    const context = useContext(PeerConnectionContext);

    return (
        <PeerConnectionContext.Provider value={context}>
            {children}
        </PeerConnectionContext.Provider>
    );
}
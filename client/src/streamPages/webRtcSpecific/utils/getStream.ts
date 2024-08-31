import React from "react";

interface WebRtcProps {
    audioElement: React.RefObject<HTMLAudioElement>,
    pc: RTCPeerConnection
}

export default async function getStreamMidea({ audioElement, pc }: WebRtcProps): Promise<MediaStream | undefined> {
    const constraints = {
        'audio': {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
        }
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const audioTrack = stream.getAudioTracks()[0]
        console.log('pc from auditrack', pc);
        
        pc.addTrack(audioTrack, stream);
        if (audioElement.current) {
            audioElement.current.srcObject = stream;
            console.log('added stream to audio element, pc');
        }
        return stream;
    } catch (err) {
        console.log("err acces local media stream", err);
        return undefined;
    }
}

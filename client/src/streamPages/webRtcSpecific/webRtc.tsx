import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import usePcContext from "../../context/peerConnectionContext";
import { Socket } from "socket.io-client";

interface WebRtcProps {
    strangerData: { username: string | null, socketId: string | null },
    view: 'host' | 'audience',
    toggelMic: boolean,
    endCall: boolean,
    setEndCall: (data: boolean) => void
}

export default function StartMic({ strangerData, view, toggelMic, endCall, setEndCall }: WebRtcProps) {
    const socket: Socket | null = useSocketContext();
    const pc = usePcContext();
    const audioElement = useRef<HTMLAudioElement | null>(null)
    const remoteAudioElement = useRef<HTMLAudioElement | null>(null)
    const polite = useRef(view === 'host');
    const makingOffer = useRef(false)
    const ignoreOffer = useRef(false)
    const [stream, setStream] = useState<MediaStream | null>(null)

    async function getAudio() {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
                advanced: [
                    { echoCancellation: { exact: true } },
                    { noiseSuppression: { exact: true } },
                    { autoGainControl: { exact: true } }
                ]
            }
        })
        for (const track of stream.getTracks()) { pc.addTrack(track, stream) }
        if (audioElement.current) audioElement.current.srcObject = stream
        setStream(stream)
    }

    useEffect(() => {
        if (!strangerData.socketId) return;
        getAudio();
        pc.ontrack = ({ track, streams }) => {
            track.onunmute = () => {
                console.log("track unmuted");
                if (remoteAudioElement.current?.srcObject) return
                if (remoteAudioElement.current) remoteAudioElement.current.srcObject = streams[0]
            }
        }

        pc.onnegotiationneeded = async () => {
            try {
                makingOffer.current = true
                await pc.setLocalDescription()
                console.log("sent offer");
                socket ? socket.emit('message', { description: pc.localDescription, to: strangerData.socketId }) : console.log('webRrtc.tsx line 43 not working');

            } catch (err) {
                console.error(err)
            } finally {
                makingOffer.current = false
            }
        }
        pc.onicecandidate = ({ candidate }) => socket ? socket.emit('message', { candidate, to: strangerData.socketId }) : console.log('webRrtc.tsx line 52 not working');

        socket && socket.on('message', async (m) => {
            const [description, candidate] = [m['description'], m['candidate']]
            if (m === undefined) return
            try {
                if (description) {
                    const offerCollision =
                        description.type === "offer" &&
                        (makingOffer.current || pc.signalingState !== "stable");

                    ignoreOffer.current = !polite.current && offerCollision;
                    if (ignoreOffer.current) {
                        console.log("ignore offer", ignoreOffer.current, "polite", polite.current, 'pc.signalingState', pc.signalingState, 'offerCollision', offerCollision);
                        return;
                    }

                    await pc.setRemoteDescription(description);
                    console.log("recived offer");
                    if (description.type === "offer") {
                        await pc.setLocalDescription();
                        socket.emit('message', { description: pc.localDescription, to: strangerData.socketId });
                        console.log("sent answer");
                    }
                } else if (candidate) {
                    try {
                        await pc.addIceCandidate(candidate);
                        console.log("added ice candidate");
                    } catch (err) {
                        if (!ignoreOffer.current) {
                            throw err;
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            }

        })
    }, [strangerData])

    useEffect(() => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = toggelMic;
        }
    }, [stream, toggelMic])

    useEffect(() => {
        if (endCall) {
            pc.close();
            if (stream) {
                stream.getTracks().forEach(track => track.stop())

                return () => {
                    stream.getTracks().forEach(track => track.stop())
                    setStream(null)
                    pc.close()
                    setEndCall(false)
                }
            }
        }
    }, [endCall])

    return <div>
        <audio ref={audioElement} autoPlay></audio>
        <audio ref={remoteAudioElement} autoPlay></audio>
    </div>

}
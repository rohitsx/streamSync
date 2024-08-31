// App.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null)
  const [strangerId, setStrangerId] = useState(null)
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)
  const polite = useRef(null)
  const makingOffer = useRef(null)
  const ignoreOffer = useRef(null)

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      transports: ['websocket'],
    })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit("connectPeer")
      socket.on('peer', v => {
        setStrangerId(v.strangerId)
        polite.current = v.polite
      });
    }

  }, [socket])

  useEffect(() => {
    if (strangerId) {
      async function getVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true })
        for (const track of stream.getTracks()) { pc.addTrack(track, stream) }
        localVideo.current.srcObject = stream
        return stream
      }
      const config = { iceServers: [{ urls: "stun:stun.mystunserver.tld" }], }
      const pc = new RTCPeerConnection(config)
      const stream = getVideo()

      pc.ontrack = ({ track, streams }) => {
        track.onunmute = () => {
          console.log("track unmuted");
          if (remoteVideo.current.srcObject) {
            return
          }
          remoteVideo.current.srcObject = streams[0]
        }
      }

      pc.onnegotiationneeded = async () => {
        try {
          makingOffer.current = true
          await pc.setLocalDescription()
          console.log("sent offer");
          socket.emit('message', { description: pc.localDescription, to: strangerId })
        } catch (err) {
          console.error(err)
        } finally {
          makingOffer.current = false
        }
      }
      pc.onicecandidate = ({ candidate }) => socket.emit('message', { candidate, to: strangerId })


      socket.on('message', async (m) => {
        const [description, candidate] = [m['description'], m['candidate']]
        if (m === undefined) return
        try {
          if (description) {
            const offerCollision =
              description.type === "offer" &&
              (makingOffer.current || pc.signalingState !== "stable");

            ignoreOffer.current = !polite.current && offerCollision;
            if (ignoreOffer.current) {
              console.log("ignore offer",ignoreOffer.current, "polite", polite.current, 'pc.signalingState', pc.signalingState, 'offerCollision',offerCollision);
              return;
            }

            await pc.setRemoteDescription(description);
            console.log("recived offer");
            if (description.type === "offer") {
              await pc.setLocalDescription();
              socket.emit('message', { description: pc.localDescription, to: strangerId });
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

    }
  }, [strangerId, polite])

  return (<>
    <video ref={localVideo} id="localVideo" autoPlay playsInline muted /> <br/>
    <video ref={remoteVideo} id="remoteVideo" autoPlay playsInline muted />
  </>)
}

export default App;
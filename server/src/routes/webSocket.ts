export default class webSocket {
  _req: Request;
  constructor(_req: Request) {
    this._req = _req;
  }
  doSomething() {
    const { socket, response } = Deno.upgradeWebSocket(this._req);
    socket.onopen = () => {
      console.log("CONNECTED");
    };
    socket.onmessage = (event) => {
      console.log(`RECEIVED: ${event.data}`);
      socket.send("pong");

    };
    socket.onclose = () => console.log("DISCONNECTED");
    socket.onerror = (error) => console.error("ERROR:", error);

    return response;
  }
}

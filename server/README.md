This server is not complete. I am currently using an in-memory server, but I am updating it to this architecture.

# Server Architecture

Our Chrome extension backend uses a combination of WebSocket communication, in-memory data storage, and persistent database storage to manage rooms, user rankings, and WebRTC connections. Below is a overview of the server architecture:

```mermaid
graph TD
    A[Redis] -->|Rooms| B[Set: roomId:hostPublicKey]
    A -->|User Rankings| C[Sorted Set: roomId]
    D[MongoDB] -->|User Socket IDs| E[Collection: user_socketId]
    F[Client] -->|Create/Join Room| G[Server]
    G -->|Manage Rooms| A
    G -->|Manage User Connections| D
    H[Host] -->|Request Socket ID| G
    G -->|Fetch Socket ID| D
```
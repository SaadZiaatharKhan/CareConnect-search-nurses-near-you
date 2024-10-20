// pages/api/socket.js
import { WebSocketServer } from 'ws'; // Ensure you import the correct class

let wss: WebSocketServer | null = null; // Declare wss with the correct type


export default function handler(req: { socket: { server: { on: (arg0: string, arg1: (request: any, socket: any, head: any) => void) => void; }; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true }); // Initialize wss correctly

    wss.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('message', (message: any) => {
        console.log('Message from client:', message);
      });

      socket.on('close', () => {
        console.log('Client disconnected');
      });
    });

    // Handle server-side upgrade for WebSockets
    req.socket.server.on('upgrade', (request, socket, head) => {
      wss!.handleUpgrade(request, socket, head, (ws) => {
        wss!.emit('connection', ws, request);
      });
    });
  }
  
  res.status(200).json({ message: 'WebSocket server running' });
}
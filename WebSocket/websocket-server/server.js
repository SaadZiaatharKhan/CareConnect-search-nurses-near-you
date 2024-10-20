// server.js
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle messages received from clients
    ws.on('message', (message) => {
        const messageString = message.toString(); // Convert buffer to string
        console.log('Received message:', messageString); // Log the string message
        // Broadcast the received message to all clients
        broadcast(messageString);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

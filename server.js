require('dotenv').config()
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/codeBlock.js');

const app = express();
app.use(cors());
app.use("", routes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//////////////////// Establishing socket connection ////////////////////

const mentorStatusMap = new Map(); // Track mentor status for each code block

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {   // triggered after send function from client
    const data = JSON.parse(message);

    if (data.type === 'join') {
      handleJoinEvent(ws, data);
    } else if (data.type === 'codeChange') {
      handleCodeChangeEvent(data);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

//////////////////// Helper functions ////////////////////

function handleJoinEvent(ws, data) {
  const { codeBlockId } = data;
  const isMentor = mentorStatusMap.get(codeBlockId);

  // Send readOnly signal to the first client (the mentor) and update mentors map
  if (!isMentor) {
    mentorStatusMap.set(codeBlockId, true);
    ws.send(JSON.stringify({ type: 'readOnly' }));
  }
}

// Broadcast the new code to all connected clients, including the sender
function handleCodeChangeEvent(data) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ type: 'code', code: data.newCode }));
  });
}

//////////////////// Server initialization ////////////////////

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

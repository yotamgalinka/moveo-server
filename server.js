require('dotenv').config()
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/codeBlock.js');
const eventHandlers = require('./eventHandlers');

const app = express();
app.use(cors());
app.use("", routes);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//////////////////// Establishing socket connection ////////////////////

const mentorStatusMap = new Map(); // Track mentor status for each code block

wss.on('connection', (ws) => {

  ws.on('message', (message) => {   // triggered after send function from client
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        eventHandlers.handleJoinEvent(ws, data, mentorStatusMap);
        break;
      case 'codeChange':
        eventHandlers.handleCodeChangeEvent(wss, data);
        break;
      case 'closePage':
        eventHandlers.handleClosePageEvent(data, mentorStatusMap);
        break;  
      case 'save':
        eventHandlers.handleSaveEvent(data);
        break;   
      default:
        break;
    }

  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
  // *************************
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

//////////////////// Server initialization ////////////////////

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const db = require('./db.js');

function handleJoinEvent(ws, data, mentorStatusMap) {
  const { codeBlockId } = data;
  console.log('Client joined block number:', codeBlockId);
  const isMentor = mentorStatusMap.get(codeBlockId);
  // Send readOnly signal to the first client (the mentor) and update mentors map
  if (!isMentor) {
    mentorStatusMap.set(codeBlockId, true);
    ws.send(JSON.stringify({ type: 'readOnly' }));
  }
}
  
// Broadcast the new code to all connected clients, including the sender
function handleCodeChangeEvent(wss, data) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ type: 'code', code: data.newCode }));
  });
}
  
function handleClosePageEvent(data, mentorStatusMap) {
  if (data.isMentor) {
    // Mentor exited the page
    mentorStatusMap.set(data.codeBlockId, false);
    console.log("mentor has exited the room");
  }
}

function handleSaveEvent(data) {
  const newCode = data.code
  const blockId = data.id
  const updateQuery = 'UPDATE moveo SET code = ? WHERE id = ?';
  db.query(updateQuery, [newCode, blockId], (err, data) => {
    if (err) {
      console.error(err);
      throw new Error('Failed to update code in the database');
    }
    console.log('Code updated in the database');
  })
}
  
module.exports = {
  handleJoinEvent,
  handleCodeChangeEvent,
  handleClosePageEvent,
  handleSaveEvent,
};
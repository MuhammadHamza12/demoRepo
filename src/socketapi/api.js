import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

function subscribeToActiveStatus(cb) {
  socket.on('statusData', status => cb(status));
  socket.emit('subscribeToActiveStatus');
}
function getAllOnlineStatus(cb) {
  socket.on('getStatus',status=>cb(status));
}
function sentMessage(email,online=true) {
  socket.emit('onlineStatus', { email , online });
}
function getMessages(cb) {
  socket.on('messages',success =>cb(success));
}
function logoutAck(email) {
  debugger;
  socket.emit('removeAck',{email});
}
function recieveAck(cb) {
  socket.on('receiveAck',email =>cb(email));
  // socket.emit('')
}

export {
  sentMessage,
  subscribeToActiveStatus,
  logoutAck,
  recieveAck,
  getMessages,
  getAllOnlineStatus
};
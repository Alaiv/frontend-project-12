export const sendMessage = (socket, body, currentChannelId, username) => {
  socket.emit('newMessage', { body, currentChannelId, username }, (response) => {
    if (response.status !== 'ok') {
      sendMessage(socket, body, currentChannelId, username);
    }
  });
};

export const createChannel = (socket, name) => {
  socket.emit('newChannel', { name }, (response) => {
    if (response.status !== 'ok') {
      console.error('Channel not created');
    }
  });
};

export const sendMessage = (socket, body, currentChannelId, username) => {
  socket.emit('newMessage', { body, currentChannelId, username }, (response) => {
    if (response.status !== 'ok') {
      sendMessage(socket, body, currentChannelId, username);
    }
  });
};

export const empty = () => {

};

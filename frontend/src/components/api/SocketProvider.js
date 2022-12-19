export const sendMessage = (socket, body, currentChannelId, username) => {
  socket.emit('newMessage', { body, currentChannelId, username }, (response) => {
    if (response.status !== 'ok') {
      console.error('Messahe not sent');
    }
  });
};

export const createChannel = (socket, { channelName }) => {
  socket.emit('newChannel', { name: channelName }, (response) => {
    if (response.status !== 'ok') {
      console.error('Channel not created');
    }
  });
};

export const renameChannel = (socket, { id, channelName }) => {
  socket.emit('renameChannel', { id, name: channelName }, (response) => {
    if (response.status !== 'ok') {
      console.error('Channel not renamed');
    }
  });
};

export const removeTheChannel = (socket, id) => {
  socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.error('Channel not removed');
    }
  });
};

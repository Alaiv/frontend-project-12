import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../api/SocketProvider.js';
import cl from './ChatArea.module.css';
import { actions } from '../../../redux/homePageSlice';
import AuthContext, { SocketContext } from '../../contexts';

const ChatArea = ({ channels, currentChannelId, messagesData }) => {
  const dispatch = useDispatch();
  const { username } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(actions.setMessage({ ...payload, username }));
    });
  }, [socket]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      sendMessage(socket, values.message, currentChannelId, username);
      resetForm({ message: '' });
    },
  });

  return (
    <div className={cl.messages}>
      <h3>
        Current active chat:
        {' '}
        {channels[currentChannelId]?.name}
      </h3>
      <div className={cl.chatArea}>
        {messagesData.messages
          .filter((msg) => msg.currentChannelId === currentChannelId)
          .map((message) => (
            <React.Fragment key={message.id}>
              <b>
                {message.username}
                {' '}
              </b>
              <p>{message.body}</p>
            </React.Fragment>
          ))}
      </div>
      <form onSubmit={formik.handleSubmit} className={cl.form}>
        <textarea name="message" id="message" onChange={formik.handleChange} value={formik.values.message} className={cl.area} required />
        <button type="submit" className={cl.btn}>Submit</button>
      </form>
    </div>
  );
};

export default ChatArea;

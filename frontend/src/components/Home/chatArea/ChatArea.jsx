import { useFormik } from 'formik';
import React from 'react';
import cl from './ChatArea.module.css';

const ChatArea = ({ channels, currentChannelId, messagesData }) => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
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
          .filter((msg) => msg.channelId === currentChannelId)
          .map((message) => <p key={message.id + Math.random()}>{message.text}</p>)}
      </div>
      <form onSubmit={formik.handleSubmit} className={cl.form}>
        <textarea name="message" id="message" onChange={formik.handleChange} value={formik.values.message} className={cl.area} required />
        <button type="submit" className={cl.btn}>Submit</button>
      </form>
    </div>
  );
};

export default ChatArea;

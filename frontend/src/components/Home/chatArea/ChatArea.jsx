import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import { sendMessage } from '../../api/SocketProvider.js';
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
    <div>
      <h3>
        Current active chat:
        {' '}
        {channels[currentChannelId]?.name}
      </h3>
      <div>
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
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col>
            <Form.Control name="message" id="message" onChange={formik.handleChange} value={formik.values.message} required />
          </Col>
          <Col>
            <Button variant="primary" type="submit">Войти</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChatArea;

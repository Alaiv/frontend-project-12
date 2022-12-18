import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/esm/Button.js';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import Container from 'react-bootstrap/esm/Container.js';
import { sendMessage } from '../../api/SocketProvider.js';
import { actions } from '../../../redux/homePageSlice';
import { SocketContext, AuthContext } from '../../contexts';

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
    <div className="d-flex flex-column h-100">
      <div className="bg-dark mb-4 p-3 shadow-sm small text-light">
        <p className="m-0"><b>{`# ${channels[currentChannelId]?.name}`}</b></p>
      </div>
      <div className="chat-messages overflow-auto px-5 ">
        {messagesData.messages
          .filter((msg) => msg.currentChannelId === currentChannelId)
          .map((message) => (
            <React.Fragment key={message.id}>
              <div className="text-break mb-2">
                <b>
                  {message.username}
                </b>
                {`: ${message.body}`}
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} className="py-1">
          <Row>
            <Col>
              <Form.Control name="message" id="message" onChange={formik.handleChange} value={formik.values.message} required />
            </Col>
            <Col>
              <Button variant="primary" type="submit">Отправить</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ChatArea;

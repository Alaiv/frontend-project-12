import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthContext from '../contexts';
import ChatArea from './chatArea/ChatArea';

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const data = useSelector((state) => state.homePage);
  const { channelData, messagesData } = data;
  const { channels, currentChannelId } = channelData;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div>
            <h3>Channels</h3>
            <div>
              {Object.values(channels).map((channel) => (
                <div key={channel.id}>
                  #
                  {channel.name}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col className="col p-0 h-100">
          <ChatArea
            messagesData={messagesData}
            currentChannelId={currentChannelId}
            channels={channels}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

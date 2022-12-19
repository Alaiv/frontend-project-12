import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatArea from './chatArea/ChatArea';
import SideBar from './sideBar/SIdeBar';
import { actions } from '../../redux/homePageSlice';
import { AuthContext } from '../contexts';

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const data = useSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const { channelData, messagesData } = data;
  const { channels, currentChannelId } = channelData;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  const setChannel = (channelId) => {
    dispatch(actions.setCurrentChat(channelId));
  };

  return (
    <Container className="my-4 overflow-hidden rounded shadow h-100">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-dark text-light">
          <SideBar
            channels={channels}
            setChannel={setChannel}
          />
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

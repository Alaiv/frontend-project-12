import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthContext from '../contexts';
import cl from './Home.module.css';
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
    <div className={cl.container}>
      <div className={cl.channels}>
        <h3>Channels</h3>
        <div className={cl.chats}>
          {Object.values(channels).map((channel) => (
            <div key={channel.id}>
              #
              {channel.name}
            </div>
          ))}
        </div>
      </div>
      <ChatArea
        messagesData={messagesData}
        currentChannelId={currentChannelId}
        channels={channels}
      />
    </div>
  );
};

export default Home;

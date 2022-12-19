import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import MyModal from '../../UI/MyModal';
import { actions } from '../../../redux/homePageSlice';
import { SocketContext } from '../../contexts';
import { createChannel, removeTheChannel, renameChannel } from '../../api/SocketProvider';
import MyDropDown from '../../UI/MyDropDown';

const SideBar = ({ channels, setChannel }) => {
  const { channelData } = useSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(actions.addNewChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(actions.renameTheChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(actions.removeChannel(payload));
    });
  }, []);

  const deleteChannel = (id) => (act) => {
    removeTheChannel(socket, id);
    act();
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>
          Каналы
        </span>
        <MyModal
          actionName="Создать канал"
          btnView="+"
          action={createChannel}
          socket={socket}
          channelData={channelData}
          type="create"
        />
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {Object.values(channels).map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable
              ? (
                <MyDropDown
                  channelName={channel.name}
                  onClick={() => setChannel(channel.id)}
                  socket={socket}
                  channelData={channelData}
                  renameChannel={renameChannel}
                  id={channel.id}
                  deleteChannel={deleteChannel}
                />
              )
              : (
                <Button onClick={() => setChannel(channel.id)} type="button" className="btn-dark w-100 rounded-0 text-start btn">
                  {`# ${channel.name}`}
                </Button>

              )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideBar;

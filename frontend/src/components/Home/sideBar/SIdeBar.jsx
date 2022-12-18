import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import MyModal from '../../UI/MyModal';
import { actions } from '../../../redux/homePageSlice';
import { SocketContext } from '../../contexts';
import { createChannel } from '../../api/SocketProvider';

const SideBar = ({ channels, setChannel, addChannel }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { channelData } = useSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const checkForDuplicate = (createdCname, stateChannels) => (
    stateChannels.every(({ name }) => name !== createdCname)
  );

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(actions.addNewChannel(payload));
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string().required('Поле обязательно'),
    }),
    onSubmit: (values, { setErrors, resetForm }) => {
      if (checkForDuplicate(values.channelName, Object.values(channelData.channels))) {
        createChannel(socket, values.channelName);
        handleClose();
        resetForm({ channelName: '' });
      } else {
        setErrors({ channelName: 'Имя должно быть уникальным' });
      }
    },
  });

  return (
    <div>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <h3>
          Каналы
        </h3>
        <Button className="text-dark btn btn-group-vertical btn-light" onClick={handleShow}>+</Button>
      </div>
      <div className="d-flex flex-column">
        {Object.values(channels).map((channel) => (
          <div key={channel.id}>
            <Button onClick={() => setChannel(channel.id)} type="button" className="btn-dark">
              #
              {channel.name}
            </Button>
            {channel.removable && <b>hi</b>}
          </div>
        ))}
      </div>
      <MyModal show={show} handleClose={handleClose} formik={formik} />
    </div>
  );
};

export default SideBar;

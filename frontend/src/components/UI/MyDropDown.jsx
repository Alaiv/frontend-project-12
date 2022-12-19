import { useFormik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { myHandleSubmitWithSocket } from '../../utils/helpers';
import MyModal from './MyModal';

const MyDropDown = ({
  onClick, channelName, socket, channelData, renameChannel, id, deleteChannel,
}) => {
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values, { setErrors, resetForm }) => {
      const isValid = myHandleSubmitWithSocket(
        { ...values, id },
        setErrors,
        socket,
        resetForm,
        channelData,
        renameChannel,
      );
    },
  });

  return (
    <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
      <Button variant="dark" onClick={onClick} className="btn-dark w-100 rounded-0 text-start btn">
        {channelName.length > 12 ? `# ${channelName.slice(0, 10)}...` : `# ${channelName}`}
      </Button>
      <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <MyModal
          actionName="Удалить канал"
          formik={null}
          btnView="Удалить"
          title="Вы уверены?"
          action={deleteChannel(id)}
        />
        <MyModal
          actionName="Переименовать канал"
          formik={formik}
          btnView="Переименовать"
          title="Введите новое имя"
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MyDropDown;

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import MyModal from './MyModal';

const MyDropDown = ({
  onClick, channelName, socket, channelData, renameChannel, id, deleteChannel,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
    <Button variant="dark" onClick={onClick} className="btn-dark w-100 rounded-0 text-start btn">
      {channelName.length > 12 ? `# ${channelName.slice(0, 10)}...` : `# ${channelName}`}
    </Button>
    <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
    <Dropdown.Menu>
      <MyModal
        type="remove"
        actionName="Удалить канал"
        formik={null}
        btnView="Удалить"
        title="Вы уверены?"
        action={deleteChannel(id)}
        socket={socket}
        channelData={channelData}
      />
      <MyModal
        type="rename"
        actionName="Переименовать канал"
        btnView="Переименовать"
        title="Введите новое имя"
        action={renameChannel}
        id={id}
        socket={socket}
        channelData={channelData}
      />
    </Dropdown.Menu>
  </Dropdown>
);
export default MyDropDown;

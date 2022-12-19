import { useFormik } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { myHandleSubmitWithSocket } from '../../utils/helpers';

const MyModal = ({
  type, actionName, btnView, title, action, socket, channelData, id = null,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values, { setErrors, resetForm }) => {
      myHandleSubmitWithSocket(
        { ...values, id },
        setErrors,
        socket,
        resetForm,
        channelData,
        action,
        handleClose,
      );
    },
  });

  return (
    <>
      <Button className="text-dark btn btn-group-vertical w-20 btn-light" onClick={handleShow}>{btnView}</Button>
      <Modal show={show} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>{actionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{title}</Modal.Body>
        {type === 'remove'
          ? (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
              <Button variant="primary" onClick={() => action(handleClose)} className="btn-danger">
                {actionName}
              </Button>
            </Modal.Footer>
          )
          : (
            <Form onSubmit={formik.handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    autoFocus
                    name="channelName"
                    id="channelName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.channelName}
                  />
                </Form.Group>
                {formik.errors.channelName && <div style={{ color: 'red' }}>{formik.errors.channelName}</div>}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Закрыть
                </Button>
                <Button variant="primary" type="submit">
                  {actionName}
                </Button>
              </Modal.Footer>
            </Form>
          )}

      </Modal>
    </>
  );
};

export default MyModal;

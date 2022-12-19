import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const MyModal = ({
  formik, actionName, btnView, title, action,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="text-dark btn btn-group-vertical btn-light" onClick={handleShow}>{btnView}</Button>
      <Modal show={show} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>{actionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{title}</Modal.Body>
        {formik
          ? (
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
                <Button variant="primary" type="submit" onClick={handleClose}>
                  {actionName}
                </Button>
              </Modal.Footer>
            </Form>
          )
          : (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
              <Button variant="primary" onClick={() => action(handleClose)} className="btn-danger">
                {actionName}
              </Button>
            </Modal.Footer>
          )}

      </Modal>
    </>
  );
};

export default MyModal;

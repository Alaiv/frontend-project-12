import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const MyModal = ({ show, handleClose, formik }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Создать канал</Modal.Title>
    </Modal.Header>

    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Название канала</Form.Label>
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
          Создать канал
        </Button>
      </Modal.Footer>
    </Form>

  </Modal>
);

export default MyModal;

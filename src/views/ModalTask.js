import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class ModalTask extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button variant="success" onClick={this.handleShow}>
          +
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export const TaskForm = () => {
  return (
    <Form>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" />
      </Form.Group>

      <Form.Group controlId="formTime">
        <Form.Label>Date/Time</Form.Label>
        <Form.Control type="datetime-local" placeholder="Date/Time" />
      </Form.Group>

      <Form.Group controlId="formDuration">
        <Form.Label>Duration</Form.Label>
        <Form.Control type="text" placeholder="Duration" />
      </Form.Group>

      <Form.Group controlId="formReminder">
        <Form.Label>Reminder</Form.Label>
        <Form.Control type="text" placeholder="Reminder" />
      </Form.Group>

      <Button variant="success" type="submit">
        Save task
      </Button>
    </Form>
  )
}

export default ModalTask

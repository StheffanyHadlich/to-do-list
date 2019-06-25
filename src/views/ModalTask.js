import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class ModalTask extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit = () => {
    const { handleSubmit, handleModal } = this.props
    handleSubmit()
    handleModal()
  }

  render() {
    const { showModal, handleModal, currentTask, handleChange } = this.props

    return (
      <>
        <Button
          variant="success"
          onClick={ handleModal }
          className = "buttonModal"
        >
          +
        </Button>

        <Modal show={ showModal } onHide={ handleModal }>
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm
              state={ currentTask }
              onChange={ handleChange }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleModal }>
              Close
            </Button>
            <Button variant="primary" onClick={ this.handleSubmit }>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export const TaskForm = props => {

  const inputs = Object.keys(props.state).map(key => {

    return (
      <Form.Group key={key} >
        <Form.Label>{key}</Form.Label>
        <Form.Control
          type = { key.includes('date') ? 'datetime-local' : 'text'}
          name = { key }
          placeholder = { key }
          value = { props.state[key] }
          onChange = { props.onChange }
        />
      </Form.Group>
    )
  })

  return <Form> { inputs } </Form>

}

export default ModalTask
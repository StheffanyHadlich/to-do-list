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

  const types = input => {
    switch(input){
      case 'done' : return inputCheckbox(input)
      case 'dateTime' : return inputTextDate(input, 'datetime-local')
      default: return inputTextDate(input)
    }
  }

  const inputTextDate = (key, type = 'text') => {
    return (
      <Form.Control
        type = { type }
        name = { key }
        placeholder = { key }
        value = { props.state[key] }
        onChange = { props.onChange }
      />
    )
  }

  const inputCheckbox = key => {
    return(
      <Form.Check
        type= "checkbox"
        name= { key }
        label= { key }
        value = { props.state[key] }
        onChange = { props.onChange }
      />
    )
  }

  const inputs = Object.keys(props.state).map(key => {
    if(key !== 'id')
    {
      return (
        <Form.Group key={key} >
          { types(key) }
        </Form.Group>
      )
    }
  })

  return <Form> { inputs } </Form>

}


export default ModalTask

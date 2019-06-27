import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge'
import CreatableSelect from 'react-select/creatable';


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
    const { showModal, tags, handleModal, currentTask, handleChange } = this.props

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
              tags = { tags }
              state = { currentTask }
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
      case 'tags': return tagSelector(input)
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

  const selectOptions = () => {
    return props.tags.map( tag => {
        return { value: tag, label: tag }
      })
  }

  const getSelectedTags = tags => {
    return tags.map( tag =>{
        return tag.value
      }
    )
  }

  const tagBadges = () => {
    return props.state.tags.map(tag => {
      return <Badge variant="secondary"> { tag } </Badge>
    })
  }

  const tagSelector = () => {
    console.log( props.state.tags )
    return (
      <>
        <CreatableSelect
          //value = { props.state.tags }
          isMulti
          onChange={ tags => props.onChange({ target: {name:'tags', value: getSelectedTags(tags)}}) }
		    	options={ selectOptions() }
        />
        { tagBadges() }
      </>
    )
  }

  const inputs = Object.keys(props.state).map( (key, index) => {
    if(key !== 'id' && key !== 'show')
    {
      return (
        <Form.Group key={ index } >
          { types(key) }
        </Form.Group>
      )
    }
    return <></>
  })

  return <Form> { inputs } </Form>

}


export default ModalTask

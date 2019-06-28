import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class ModalTask extends Component {

  render() {
    const { showModal, selectOptions, getSelectedTags, toggleModal, currentTask, handleChange, handleSubmit } = this.props

    return (
      <>
        <Button
          variant="success"
          onClick={toggleModal}
          className="buttonModal"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>

        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm
              state={currentTask}
              onChange={handleChange}
              selectOptions={selectOptions}
              getSelectedTags={getSelectedTags}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export const InputCheckbox = props =>
  <Form.Check
    type="checkbox"
    name={props.input}
    label={props.input}
    value={props.checked}
    checked={props.checked}
    onChange={props.onChange}
  />


export const TagSelector = props => {
  const getValues = () => props.tags.map(tag => ({ value: tag, label: tag }))

  return (
    <CreatableSelect
      isMulti
      onChange={tags => props.onChange({ target: { name: 'tags', value: props.getSelectedTags(tags) } })}
      options={props.selectOptions()}
      value={getValues()}
    />
  )
}

export const InputTextDate = props =>
  <Form.Control
    type={props.type}
    name={props.input}
    placeholder={props.input}
    value={props.value}
    onChange={props.onChange}
  />

export const TaskForm = props => {

  const getType = input => {
    if (!types[input])
      return (
        <InputTextDate
          input={input}
          type={'text'}
          value={props.state[input]}
          onChange={props.onChange}
        />
      )

    return types[input]
  }

  const types = {
    done:(<InputCheckbox
        input={ 'done' }
        checked={props.state.done}
        onChange={props.onChange}
    />),
    dateTime: (<InputTextDate
        input= { 'dateTime' }
        type={'datetime-local'}
        value={props.state.dateTime}
        onChange={props.onChange}
    />),
    tags: (<TagSelector
      tags={props.state.tags}
      onChange={props.onChange}
      getSelectedTags={props.getSelectedTags}
      selectOptions={props.selectOptions}
    />)
  }

  const inputs = Object.keys(props.state).map(key => {
    if (key !== 'id' && key !== 'show') {
      return (
        <Form.Group key={key} >
          {getType(key)}
        </Form.Group>
      )
    }
    return <div key={key}></div>
  })

  return <Form> {inputs} </Form>

}

export default ModalTask

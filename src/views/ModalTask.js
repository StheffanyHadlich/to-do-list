import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge'
import CreatableSelect from 'react-select/creatable';

class ModalTask extends Component {

  render() {
    const { showModal, selectOptions, getSelectedTags, handleModal, currentTask, handleChange, handleSubmit } = this.props

    return (
      <>
        <Button
          variant="success"
          onClick={handleModal}
          className="buttonModal"
        >
          +
        </Button>

        <Modal show={showModal} onHide={handleModal}>
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
            <Button variant="secondary" onClick={handleModal}>
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

export const TaskForm = props => {

  const inputTextDate = (key, type = 'text') =>
    <Form.Control
      type={type}
      name={key}
      placeholder={key}
      value={props.state[key]}
      onChange={props.onChange}
    />

  const inputCheckbox = key =>
    <Form.Check
      type="checkbox"
      name={key}
      label={key}
      value={props.state[key]}
      onChange={props.onChange}
    />

  const tagBadges = () =>
    props.state.tags.map((tag, index) => {
      return <Badge key={index} variant="secondary"> {tag} </Badge>
    })

  const tagSelector = () =>
    <>
      <CreatableSelect
        isMulti
        onChange={tags => props.onChange({ target: { name: 'tags', value: props.getSelectedTags(tags) } })}
        options={props.selectOptions()}
        setValue={'teste'}
      />
      {tagBadges()}
    </>


  const getType = input => {
    if (!types[input])
      return inputTextDate(input)

    return types[input](input)
  }

  const types = {
    done: inputCheckbox,
    dateTime: input => inputTextDate(input, 'datetime-local'),
    tags: tagSelector
  }

  const inputs = Object.keys(props.state).map((key, index) => {
    if (key !== 'id' && key !== 'show') {
      return (
        <Form.Group key={index} >
          {getType(key)}
        </Form.Group>
      )
    }
    return <div key={index}></div>
  })

  return <Form> {inputs} </Form>

}

export default ModalTask

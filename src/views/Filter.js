import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Filter extends Component {

  render() {
    const { search, status, onChange, onClickSearch } = this.props

    return(
      <>
        <Search
          search = { search }
          onChange = { onChange }
          onClick = { onClickSearch }
        />
        <Status
          onChange = { onChange }
          status = { status }
        />
      </>
    )
  }
}

export const Status = props => { //TODO: Revisar radio buttons
  return (
    <Form.Group >
      <Form.Check
        inline name = "show"
        label="All"
        value = "all"
        name="status"
        onChange = { props.onChange }
        checked = { props.status === 'all' }
        type="radio"
      />
      <Form.Check
        inline name = "show"
        label="Done"
        value = "done"
        name="status"
        onChange = { props.onChange }
        checked = { props.status === "done" }
        type="radio"
      />
      <Form.Check
        inline name = "show"
        label="Unfinished"
        name="status"
        value = "unfinished"
        onChange = { props.onChange }
        checked = { props.status === "unfinished" }
        type="radio"
      />
    </Form.Group>
  )
}

export const Search = props => {
  return (
    <Form.Group>
      <Form.Control
        type = "text"
        placeholder = "Search"
        name = "search"
        value = { props.search }
        onChange = { props.onChange }
        />
      <Button
        variant="btn btn-primary"
        onClick = { props.onClick}
        >
        Serach
      </Button>
    </Form.Group>
  )
}


export default Filter

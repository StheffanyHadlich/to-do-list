import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Filter extends Component {

  render() {
    const { search, onChange, onClickSearch } = this.props

    return(
      <>
        <Search
          search = { search }
          onChange = { onChange }
          onClick = { onClickSearch }
        />

      </>
    )
  }
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

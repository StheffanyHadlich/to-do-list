import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Filter extends Component {

  render() {
    const { search, status, period, onChange, onClickSearch } = this.props

    return(
      <>
        <Search
          search = { search }
          onChange = { onChange }
          onClick = { onClickSearch }
        />
        <Radio
          onChange = { onChange }
          checked = { status }
          options = { ['all', 'done', 'unfinished'] }
          name = "status"
        />
        <Radio
          onChange = { onChange }
          checked = { period }
          options = { ['all', 'today', 'month', 'year'] }
          name = "period"
        />
      </>
    )
  }
}

export const Radio = props => { //TODO: Revisar radio buttons

  const radioButtons = props.options.map( (option, index) => {
    return(
      <Form.Check
        key = { index }
        inline
        label = { option }
        value = { option }
        name = { props.name }
        onChange = { props.onChange }
        checked = { props.checked === option }
        type = "radio"
      />
    )
  })

  return <Form.Group > { radioButtons } </Form.Group>
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

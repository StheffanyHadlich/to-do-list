import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

class Filter extends Component {

  render() {
    const { search, status, selectOptions, getSelectedTags, period, onChange, onClickSearch, filterByTag } = this.props

    return (
      <>
        <FilterTag
          onClick={filterByTag}
          onChange={onChange}
          selectOptions={selectOptions}
          getSelectedTags={getSelectedTags}
        />
        <Search
          search={search}
          onChange={onChange}
          onClick={onClickSearch}
        />
        <Radio
          onChange={onChange}
          checked={status}
          options={['all', 'done', 'unfinished']}
          name="status"
        />
        <Radio
          onChange={onChange}
          checked={period}
          options={['all', 'today', 'month', 'year']}
          name="period"
        />
      </>
    )
  }
}

export const FilterTag = props =>
  <Form.Group>
    <Select
      isMulti
      name="tags"
      options={props.selectOptions()}
      onChange={tags => props.onChange({ target: { name: 'filterTags', value: props.getSelectedTags(tags) } })}
    />
  </Form.Group>


export const Radio = props => {

  const radioButtons = props.options.map((option, index) => {
    return (
      <Form.Check
        key={index}
        inline
        label={option}
        value={option}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked === option}
        type="radio"
      />
    )
  })

  return <Form.Group > {radioButtons} </Form.Group>
}

export const Search = props =>
  <Form.Group>
    <Form.Control
      type="text"
      placeholder="Search"
      name="search"
      value={props.search}
      onChange={props.onChange}
    />
    <Button
      variant="btn btn-primary"
      onClick={props.onClick}
    >
      Serach
      </Button>
  </Form.Group>

export default Filter

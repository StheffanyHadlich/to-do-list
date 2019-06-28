import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const Filter = props =>
      <>
        <Search
          search={props.search}
          onChange={props.onChange}
          onClick={props.onClickSearch}
        />
        <FilterTag
          onClick={props.filterByTag}
          onChange={props.onChange}
          selectOptions={props.selectOptions}
          getSelectedTags={props.getSelectedTags}
        />
        <Form.Label>Filter by completion status</Form.Label>
        <Radio
          onChange={props.onChange}
          checked={props.status}
          options={['all', 'done', 'unfinished']}
          name="status"
        />
        <Form.Label>Filter by period</Form.Label>
        <Radio
          onChange={props.onChange}
          checked={props.period}
          options={['all', 'today', 'month', 'year']}
          name="period"
        />
      </>


export const FilterTag = props =>
  <Form.Group>
    <Form.Label>Filter by tag</Form.Label>
    <Select
      isMulti
      className="input-select"
      name="tags"
      options={props.selectOptions()}
      onChange={tags => props.onChange({ target: { name: 'filterTags', value: props.getSelectedTags(tags) } })}
    />
  </Form.Group>


export const Radio = props => {

  const radioButtons = props.options.map(option => {
    return (
      <Form.Check
        key={option}
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
    <Form.Label>Search by title or description </Form.Label>
    <div className="search-bar">
      <Form.Control
        type="text"
        className="input-select"
        placeholder="Search"
        name="search"
        value={props.search}
        onChange={props.onChange}
      />
      <Button
        variant="btn btn-primary"
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faSearch} />

      </Button>
    </div>

  </Form.Group>

export default Filter

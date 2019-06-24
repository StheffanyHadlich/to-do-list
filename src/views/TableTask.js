import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

class TableTask extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: [{ id:1, title: 'task 1'}, { id: 2, title: 'task 2'}]
    }
  }

  deleteTask = (id) => {

    this.setState({
      tasks: this.state.tasks.filter( task => task.id !== id )
    })
  }

  render () {
      return (
        <Table>
          <TableHead />
          <TableBody
            tasks={this.state.tasks}
            deleteTask={ this.deleteTask }/>
        </Table>
      )
  }
}

export const TableHead = () => {
  return(
    <thead>
      <tr>
        <th>Tasks</th>
        <th>Actions</th>
      </tr>
    </thead>
  )
}


export const TableBody = props => {

  const result = props.tasks.map( element => {
    return (
      <tr key={element.id}>
        <td>{ element.title }</td>
        <td>
          <button
            type="button"
            className="btn btn-secondary"
            >
              Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={ () => props.deleteTask (element.id) }
            >
              Delete
          </button>
        </td>
      </tr>
    )
  })

  return <tbody>{ result }</tbody>

}
export default TableTask;

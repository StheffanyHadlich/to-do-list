import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'


class TableTask extends Component {

  render () {
    const { tasks, deleteTask, editTask } = this.props
    return (
      <Table>
        <TableHead />
        <TableBody
          tasks = { tasks }
          deleteTask = { deleteTask }
          editTask = { editTask }
        />
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
    if(!element.show)
      return

    return (
      <tr key={element.id}>
        <td>{ element.title }{ element.done? ' - done' : '' } </td>
        <td>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={ () => props.editTask (element.id) }
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

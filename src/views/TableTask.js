import React from 'react';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'



export const TableTask = props =>
  <Table>
    <TableHead />
    <TableBody
      tasks={props.tasks}
      completionStatus={props.status}
      period={props.period}
      deleteTask={props.deleteTask}
      editTask={props.editTask}
    />
  </Table>

export const TableHead = () =>
  <thead>
    <tr>
      <th>Tasks</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>


export const TableBody = props => {

  const statusCheck = status => {
    switch (props.completionStatus) {
      case 'done': return status
      case 'unfinished': return !status
      default: return true;
    }
  }

  const verifyDay = date => {
    const moment = require('moment');
    const today = `-${('0' + moment().date()).slice(-2)}T`
    return date.includes(today)
  }

  const verifyMonth = date => {
    const moment = require('moment');
    const month = `${('0' + (moment().month() + 1)).slice(-2)}-`
    return date.includes(month)
  }

  const verifyYear = date => {
    const moment = require('moment');
    const year = moment().year()
    return date.includes(year)
  }

  const periodCheck = date => {
    switch (props.period) {
      case 'today': return verifyDay(date) && verifyMonth(date) && verifyYear(date)
      case 'month': return verifyMonth(date) && verifyMonth(date)
      case 'year': return verifyYear(date)
      default: return true
    }
  }

  const result = props.tasks.map(element => {
    if (element.show && statusCheck(element.done) && periodCheck(element.dateTime)) {
      return (
        <tr key={element.id}>
          <td>{element.title}</td>
          <td>{element.done ? <FontAwesomeIcon icon={faCheck} /> : ''} </td>
          <td>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => props.editTask(element.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => props.deleteTask(element.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      )
    }
    return <tr key={element.id}></tr>
  })

  return <tbody>{result}</tbody>

}
export default TableTask;

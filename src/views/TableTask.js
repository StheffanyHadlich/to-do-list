import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'


class TableTask extends Component {

  render () {
    const { tasks, status, period, deleteTask, editTask } = this.props
    return (
      <Table>
        <TableHead />
        <TableBody
          tasks = { tasks }
          completionStatus = { status }
          period = { period }
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

  const statusCheck = status => {
    switch(props.completionStatus) {
      case 'done': return status
      case 'unfinished': return !status
      default: return true;
    }
  }

  const verifyDay = date => {
    const moment = require('moment');
    const today = `-${('0'+moment().date()).slice(-2)}T`
    return date.includes(today)
  }

  const verifyMonth = date => {
    const moment = require('moment');
    const month = `${('0'+(moment().month()+1)).slice(-2)}-`
    return date.includes(month)
  }

  const verifyYear = date => {
    const moment = require('moment');
    const year = moment().year()
    return date.includes(year)
  }

  const periodCheck = date => {
    switch(props.period){
      case 'today' : return verifyDay(date) && verifyMonth(date) && verifyYear(date)
      case 'month' : return verifyMonth(date) && verifyMonth(date)
      case 'year' : return verifyYear(date)
      default: return true
    }
  }

  const result = props.tasks.map( element => {
    if(element.show && statusCheck(element.done) && periodCheck(element.dateTime)){
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
    }


  })

  return <tbody>{ result }</tbody>

}
export default TableTask;

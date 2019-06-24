import React, { Component } from 'react';
import TableTask from './TableTask'
import ModalTask from './ModalTask'


class TodoList extends Component {
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
        <div>
          <TableTask
            tasks={ this.state.tasks }
            deleteTask = { this.deleteTask }
          />
          <ModalTask />
        </div>
      )
  }
}

export default TodoList;

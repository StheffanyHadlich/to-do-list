import React, { Component } from 'react';
import TableTask from './TableTask'
import ModalTask from './ModalTask'


class TodoList extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      tasks: [],
      showModal: false,
      currentTask: {
        id: 0,
        title: '',
        description: '',
        dateTime: '',
        duration: '',
        reminder: ''
      }
    }

    this.state = this.initialState
  }


  handleModal = () => this.setState({ showModal: !this.state.showModal })

  handleEdit = async currentTask => {
    await this.deleteTask(currentTask.id)
    this.setState({ tasks: [...this.state.tasks, currentTask]})

  }

  handleCreate = task => {
    const uuidv1 = require('uuid/v1')
    task = {...task, id: uuidv1()}
    this.setState({
      tasks: [...this.state.tasks, task ],
      currentTask: this.initialState.currentTask
    })
  }

  handleSubmit = () => {
    let task = this.state.currentTask

    return !task.id ? this.handleCreate(task) : this.handleEdit(task)
  }

  handleChange = event => {
    const {name, value} = event.target;

    this.setState({
      currentTask:{
        ...this.state.currentTask,
        [name]: value
      }
    });
  }

  deleteTask = id => {
    this.setState({
      tasks: this.state.tasks.filter( task => task.id !== id )
    })
  }

  editTask = async id => {
    await this.state.tasks.forEach( task => {
      if(task.id === id)
        this.setState({ currentTask: task})
    })
    this.handleModal()
  }

  render () {
      return (
        <div>
          <TableTask
            tasks = { this.state.tasks }
            deleteTask = { this.deleteTask }
            editTask = { this.editTask }
          />
          <ModalTask
            showModal = { this.state.showModal }
            currentTask = { this.state.currentTask }
            handleModal = { this.handleModal }
            handleSubmit = { this.handleSubmit }
            handleChange = { this.handleChange }
          />
        </div>
      )
  }
}

export default TodoList;

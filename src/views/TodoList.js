import React, { Component } from 'react';
import TableTask from './TableTask'
import ModalTask from './ModalTask'
import Filter from './Filter'


class TodoList extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      tasks: [],
      showModal: false,
      search: '',
      status: 'all',
      period: 'all',
      currentTask: {
        id: 0,
        title: '',
        done: false,
        description: '',
        dateTime: '',
        duration: '',
        reminder: '',
        show: true // pros filtros assim da pra alterar quais devem aparecer sem comprometer a existência
      }
    }

    this.state = this.initialState
  }


  handleModal = () => this.setState({ showModal: !this.state.showModal })

  handleEdit = async currentTask => {
    await this.deleteTask(currentTask.id)
    this.setState({
      tasks: [...this.state.tasks, currentTask],
      currentTask: this.initialState.currentTask
    })

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

  handleFormChange = event => {
    let { name, value } = event.target
    value = name !== 'done' ? value : !this.state.currentTask.done

    this.setState({
      currentTask:{
        ...this.state.currentTask,
        [name]: value
      }
    });
  }

  handleSearcheChange = event => {
    const { name, value } = event.target

    if(name === 'search')
      this.resetSearch()

    this.setState({
      [name]: value
    })
  }

  resetSearch = () => {
    if(this.state.search)
      return

    this.setState({
      tasks:  this.state.tasks.map( task => {
        task.show = true
        return task
      }),
      search: ''
    })
  }

  handleSearch  = () => {
    this.resetSearch()

    this.setState({
      tasks: this.state.tasks.map( task => {
        if(!task.title.includes(this.state.search) && !task.description.includes(this.state.search))
          task.show = false

        return task
      })
    })
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
        <>
          <Filter
            search = { this.state.search }
            status = { this.state.status }
            period = { this.state.period }
            onChange = { this.handleSearcheChange }
            onClickSearch = { this.handleSearch }
          />
          <TableTask
            status = { this.state.status }
            period = { this.state.period }
            tasks = { this.state.tasks }
            deleteTask = { this.deleteTask }
            editTask = { this.editTask }
          />
          <ModalTask
            showModal = { this.state.showModal }
            currentTask = { this.state.currentTask }
            handleModal = { this.handleModal }
            handleSubmit = { this.handleSubmit }
            handleChange = { this.handleFormChange }
          />
        </>
      )
  }
}

export default TodoList;

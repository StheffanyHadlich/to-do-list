import React, { Component } from 'react';
import TableTask from './TableTask'
import ModalTask from './ModalTask'
import Filter from './Filter'
import * as TaskModel from '../model/TaskModel'
import * as TagModel from '../model/TagModel'

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      tasks: [],
      tags: [],
      filterTags: [],
      showModal: false,
      search: '',
      status: 'all',
      period: 'all',
      currentTask: {
        title: '',
        done: false,
        description: '',
        dateTime: '',
        duration: '',
        tags: [],
        show: true
      }
    }

    this.state = this.initialState
  }

  componentDidMount() {
    this.updateTasks()
    this.updateTags()
  }

  updateTags = () =>
    TagModel.getAll()
      .then(result => this.setState({ tags: result }))
      .catch(error => console.log(error))

  updateTasks = () =>
    TaskModel.getAll()
      .then(result => this.setState({ tasks: result }))
      .catch(error => console.log(error))

  postTask = () =>
    TaskModel.add(this.state.currentTask)
      .then(() => this.handleSubmit())
      .catch(error => console.log(error))

  editTask = async id => {
    TaskModel.get(id)
      .then(result => this.setState({ currentTask: result }))
      .catch(error => console.log(error))
    this.handleModal()
  }

  destroyTask = id =>
    TaskModel.destroy(id)
      .then(() => this.updateTasks())
      .catch(error => console.log(error))

  handleSubmit = () => {
    this.updateTasks()
    this.handleModal()
  }

  resetCurrentTask = () => this.setState({ currentTask: this.initialState.currentTask })

  handleEdit = async currentTask => await this.deleteTask(currentTask.id)

  handleModal = () => {
    this.resetCurrentTask()
    this.setState({ showModal: !this.state.showModal })
  }

  handleFormChange = event => {
    let { name, value } = event.target
    value = typeof value !== "boolean" ? value : !this.state.currentTask[name]

    this.setState({
      currentTask: {
        ...this.state.currentTask,
        [name]: value
      }
    });
  }

  handleSearcheChange = async event => {
    const { name, value } = event.target

    await this.setState({
      [name]: value
    })

    if (name === 'search')
      this.resetSearch()

    if (name === 'filterTags')
      this.filterByTags()
  }

  selectOptions = () =>
    this.state.tags.map(tag => ({
      value: tag.name,
      label: tag.name
    }))

  getSelectedTags = tags => tags ? tags.map(tag => tag.label) : []

  resetSearch = () => {
    if (this.state.search)
      return

    this.setState({
      tasks: this.state.tasks.map(task => {
        task.show = true
        return task
      }),
      search: ''
    })
  }

  handleSearch = () => {
    this.resetSearch()

    this.setState({
      tasks: this.state.tasks.map(task => {
        if (!task.title.includes(this.state.search) && !task.description.includes(this.state.search))
          task.show = false

        return task
      })
    })
  }

  filterByTags = () => {

    if (this.state.filterTags) {
      this.setState({
        tasks: this.state.tasks.map(task=> {
          const taskTags = task.tags.map(item => item.name)
          task.show = this.state.filterTags.every(item =>  taskTags.includes(item))
          return task
        })
      })
    }
  }

  render() {
    return (
      <>
        <Filter
          selectOptions={this.selectOptions}
          getSelectedTags={this.getSelectedTags}
          search={this.state.search}
          status={this.state.status}
          period={this.state.period}
          onChange={this.handleSearcheChange}
          onClickSearch={this.handleSearch}
        />
        <TableTask
          status={this.state.status}
          period={this.state.period}
          tasks={this.state.tasks}
          deleteTask={this.destroyTask}
          editTask={this.editTask}
        />
        <ModalTask
          selectOptions={this.selectOptions}
          getSelectedTags={this.getSelectedTags}
          showModal={this.state.showModal}
          currentTask={this.state.currentTask}
          handleSubmit={this.postTask}
          handleChange={this.handleFormChange}
          handleModal={this.handleModal}
        />
      </>
    )
  }
}

export default TodoList;

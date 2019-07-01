import React, { Component } from 'react';
import TableTask from './TableTask'
import ModalTask from './ModalTask'
import Filter from './Filter'
import * as TaskModel from '../model/TaskModel'
import * as TagModel from '../model/TagModel'
import '../App.css';

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
    TaskModel.save(this.state.currentTask)
      .then(this.handleSubmit)
      .catch(error => console.log(error))

  editTask = async id => {
    TaskModel.get(id)
      .then(result => this.setState({ currentTask: result }))
      .catch(error => console.log(error))
    this.toggleModal()
  }

  destroyTask = id =>
    TaskModel.destroy(id)
      .then(this.updateTasks)
      .catch(error => console.log(error))

  handleSubmit = () => {
    this.updateTasks()
    this.updateTags()
    this.toggleModal()
  }

  resetCurrentTask = () => this.setState({ currentTask: this.initialState.currentTask })

  handleEdit = async currentTask => await this.deleteTask(currentTask.id)

  toggleModal = () => {
    this.resetCurrentTask()
    this.setState({ showModal: !this.state.showModal })
  }

  handleFormChange = event => {
    let { name, value } = event.target
    value = name !== "done" ? value : !this.state.currentTask[name]

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
      tasks:TaskModel.resetSearch(this.state.tasks),
      search: ''
    })
  }

  handleSearch = () => {
    this.resetSearch()

    this.setState({
      tasks: TaskModel.search(this.state.tasks,this.state.search)
    })
  }

  filterByTags = () => {

    if (this.state.filterTags) {
      this.setState({
        tasks: TaskModel.filterByTag(this.state.filterTags, this.state.tasks)
      })
    }
  }

  render() {
    return (
      <div className="todo-list">
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
          toggleModal={this.toggleModal}
        />
      </div>
    )
  }
}

export default TodoList;

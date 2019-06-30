import * as TaskRepository from '../repositories/TaskRepository'

export const getAll = async function(){
  return await TaskRepository.getAll()
}

export const save = async function(task){
  return await task.id ? TaskRepository.update(task) : TaskRepository.create(task)
}

export const destroy = async function(id){
  return await TaskRepository.destroy(id)
}

export const get = async function(id){
  return await TaskRepository.get(id)
}

export const search = function(tasks, search) {
  return tasks.map(task => {
    const regex = new RegExp(`[${task.title} ${task.description}]`,"i");
    return {
      ...task,
      show: regex.test(search)
    }
  })
}

export const filterByTag = function(filter, tasks){
  return tasks.map(task => {
    const taskTags = task.tags.map(item => item.name)
    return {
      ...task,
      show: filter.every(item =>  taskTags.includes(item))
    }
  })
}

export const resetSearch = function(tasks){
  return tasks.map( task => {
    return {
      ...task,
      show: true
    }
  })
}

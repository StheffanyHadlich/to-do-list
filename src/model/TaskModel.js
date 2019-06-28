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

export const search = function(task, search) {
  const regex = new RegExp(`[${task.title} ${task.description}]`,"i");
  return regex.test(search)
}

export const filterByTag = function(filter, tags){
  const taskTags = tags.map(item => item.name)
  return filter.every(item =>  taskTags.includes(item))
}

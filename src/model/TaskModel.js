import * as TaskRepository from '../repositories/TaskRepository'

export const getAll = async function(){
  return await TaskRepository.getAll()
}

export const add = async function(task){
  console.log(task)
  return await task.id ? TaskRepository.update(task) : TaskRepository.add(task)
}

export const destroy = async function(id){
  return await TaskRepository.destroy(id)
}

export const get = async function(id){
  const tasks = await TaskRepository.get(id)
  console.log(tasks)
  return tasks
}



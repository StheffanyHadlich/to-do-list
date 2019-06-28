import * as TagRepository from '../repositories/TagRepository'

export const getAll = async function(){
  return await TagRepository.getAll()
}

import axios from 'axios';
const api_url = "http://localhost:3000/"

export const getAll = async () => {
  const result = await axios.get(`${api_url}tasks`)
  return result.data;
};

export const get = async (id) => {
  const result = await axios.get(`${api_url}tasks/${id}`)
  return result.data;
};

export const add = async (task) => {
  console.log(task)
  const result = axios.post(`${api_url}tasks`, task)
  return result;
}

export const update = async (task) => {
  const result = axios.patch(`${api_url}tasks/${task.id}`, task)
  return result;
}


export const destroy = async (id) => {
  const result = await axios.delete(`${api_url}tasks/${id}`)
  return result.data;
};

// export const delete = async (task, id) => {

export const getTasksTags = async (id) => {
  const result = await axios.get(`${api_url}tasks/${id}/tags`)
  return result.data;
}
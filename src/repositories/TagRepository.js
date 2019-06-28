import axios from 'axios';
const api_url = "http://localhost:3000/"

export const getAll = async () => {
  const result = await axios.get(`${api_url}tags`)
  return result.data;
};

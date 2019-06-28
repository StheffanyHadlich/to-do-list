import axios from 'axios';
const api_url = "https://geru-to-do-list-api.herokuapp.com/"

export const getAll = async () => {
  const result = await axios.get(`${api_url}tags`)
  return result.data;
};

import axios from 'axios/index';

export const get = async (url) => {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const post = async (url, data) => {
  try {
    const result = await axios.post(url, data);
    return result.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const deleteRequest = async (url, data) => {
  try {
    const result = await axios.delete(url, data);
    return result.data;
  } catch (e) {
    throw e.response.data;
  }
};

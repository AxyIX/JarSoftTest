import axios from 'axios/index';

export const get = async (url) => {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
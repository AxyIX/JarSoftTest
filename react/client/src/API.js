import axios from 'axios';


export const loadBanners = async () => {
  try {
    const result = await axios.get("/banners/all");
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export const loadCategories = async () => {
  try {
    const result = await axios.get("/categories/all");
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
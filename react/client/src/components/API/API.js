import { get } from "./base";


export const loadBanners = async () => {
  try {
    const result = await get("/banners/all");
    return result;
  } catch (e) {
    console.log(e);
  }
}

export const loadCategories = async () => {
  try {
    const result = await get("/categories/all");
    return result;
  } catch (e) {
    console.log(e);
  }
}
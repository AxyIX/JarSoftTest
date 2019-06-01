import {deleteRequest, get, post} from "./base";


export const loadBanners = async () => {
    const result = await get("/banners");
    return result;
}

export const loadCategories = async () => {
    const result = await get("/categories");
    return result;
}

export const saveBanner = async (banner, category) => {
    const result = await post("/categories/" + category + "/banners", banner);
    return result;
}

export const deleteBanner = async (id) => {
    const result = await deleteRequest("/banners/"+id);
    return result;
}

export const saveCategory = async (category) => {
    const result = await post("/categories/", category);
    return result;
}

export const deleteCategory = async (id) => {
    const result = await deleteRequest("/categories/"+id);
    return result;
}
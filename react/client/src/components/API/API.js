import { get, post } from "./base";


export const loadBanners = async () => {
    const result = await get("/banners");
    return result;
}

export const loadCategories = async () => {
    const result = await get("/categories");
    return result;
}

export const saveBanner = async (banner, category) => {
    const result = await post("/category/" + category + "/banners", banner);
    return result;
}
import prisma from "../utils/db.js";
import { findCategoryRepository, findCategorybyIdRepository, insertCategoryRepository } from "./category.repository.js";
const getAllCategoryServivce = async () => {
    const categories = await findCategoryRepository();
    return categories;
}

const getCategoryByIdService = async (id) => {
    const category = await findCategorybyIdRepository(id);
    return category;
}
const createDataCategoryService = async (newDataCategory) => {
    const category = await insertCategoryRepository(newDataCategory);

    return category;
}

export { getAllCategoryServivce, getCategoryByIdService, createDataCategoryService };
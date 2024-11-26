import prisma from "../utils/db.js";
import { getAllCategoryServivce, getCategoryByIdService, createDataCategoryService } from "./category.service.js";

export const getAllCategoryController = async (req, res) => {

    try {
        const categories = await getAllCategoryServivce();
        if (!categories) {
            throw new Error("Category not found");
        }
        res.status(200).json({
            message: "Success get all category",
            statusCode: 200,
            data: categories,
        });
    } catch (err) {
        res.status(500).json({
            error: {
                code: 500,
                message: err.message,
            }
        });
    }
}

export const getCategoryByIdController = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const category = await getCategoryByIdService(categoryID);
        if (!category) {
            throw new Error("Category ID not found");
        }
        res.status(200).json({
            message: "Success get category by ID",
            statusCode: 200,
            data: category
        });
    } catch (err) {
        res.status(500).json({
            error: {
                code: 500,
                message: err.message,
            }
        });
    }
}

export const createDataCategoryController = async (req, res) => {

    try {
        const newCategoryData = req.body;
        const category = await createDataCategoryService(newCategoryData);

        res.status(200).json({
            message: "Success Add Category",
            statusCode: 200,
            data: category
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || "An error occurred",
            statusCode: 404,
        });
    }

}


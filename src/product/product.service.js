// service layer untuk menghandle bisnis logic
// kenapa dipisah? Supaya tanggung jawab nya ter-isolate dan function nya
// reuseable

import prisma from "../utils/db.js";
import { findProducts, findProductById, insertProduct, deleteProductRepository } from "./product.repository.js";

const getAllProducts = async () => {
    const products = await findProducts();
    if (!products) {
        throw new Error("Product not found");
    }
    return products;
}

const getProductbyId = async (id) => {

    const product = await findProductById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

const createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData);

    return product;

}

const deleteProduct = async (id) => {
    const product = await deleteProductRepository(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}
// KALAU PUT SEMUA FIELD HARUS DI UPDATE
const updateProductPut = async (id, productData) => {

    const product = await prisma.product.update({
        where: {
            id: id
        },
        data: productData
    });

    return product;

}



export {
    getAllProducts,
    getProductbyId,
    createProduct,
    deleteProduct,
    updateProductPut,
};
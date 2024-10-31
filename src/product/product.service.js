// service layer untuk menghandle bisnis logic
// kenapa dipisah? Supaya tanggung jawab nya ter-isolate dan function nya
// reuseable

import prisma from "../db/index.js";

const getAllProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
}

const getProductbyId = async (id) => {

    const product = await prisma.product.findUnique({
        where: {
            id
        }
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

const createProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price,
        },
    })

    return product;

}

const deleteProduct = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id,
        }
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}
// KALAU PUT SEMUA FIELD HARUS DI UPDATE
const updateProductPut = async (id, productData) => {
    if (!(productData.image && productData.description && productData.name && productData.price)) {
        return res.status(400).send("Some field are missing");
    }
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
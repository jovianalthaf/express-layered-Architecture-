// Layer untuk handle request dan response
// Biasanya juga handle validasi body
import express from "express";
import prisma from "../utils/db.js"
import { getAllProducts, getProductbyId, createProduct, deleteProduct, updateProductPut } from "./product.service.js";
const router = express.Router();



export const getAllProductController = async (req, res) => {
    // dapetin banyak product disimpan dalam variabel product dan dikirim products

    // tungguin sampe dapetin data product dulu baru kirim

    // prisma = database, ngambil model  product dan dapetin semuanya
    // select * from products;
    try {
        const products = await getAllProducts();
        res.status(200).json({
            message: "Success get all product",
            statusCode: 200,
            data: products,
        });
    } catch (err) {
        res.status(500).json({
            error: {
                code: 500,
                message: err.message,
            }
        });
    }





    // res.send(products);
};



export const getProductbyIdController = async (req, res) => {
    try {
        const productID = req.params.id;
        const product = await getProductbyId(productID);

        res.status(200).json({
            message: "Success get product by ID",
            statusCode: 200,
            data: product
        });
    } catch (err) {
        res.status(500).json({
            error: {
                code: 500,
                message: err.message,
            }
        });
    }
};
export const createProductController = async (req, res) => {
    try {
        const newProductData = req.body;
        const product = await createProduct(newProductData);
        res.status(200).json({
            message: "Success Add product",
            statusCode: 200,
            data: product
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || "An error occurred",
            statusCode: 404,
        });
    }

};
export const deleteProductController = async (req, res) => {
    try {
        const productID = req.params.id;
        const product = await deleteProduct(productID);
        res.status(200).json({
            message: "Success Delete",
            statusCode: 200,
            data: product
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || "An error occurred",
            statusCode: 404,
        });
    }
};



// KALAU PUT SEMUA FIELD HARUS DI UPDATE
export const updateProductController = async (req, res) => {
    try {
        const productID = req.params.id;
        const newProduct = req.body;
        const productData = await updateProductPut(productID, newProduct);
        if (!(productData.image && productData.description && productData.name && productData.price)) {
            return res.status(400).send("Some field are missing");
        }
        res.status(200).json({
            message: "Success Put",
            statusCode: 200,
            data: productData
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || "An error occurred",
            statusCode: 404,
        });
    }
};


// KALAU PATCH TIDAK SEMUA HARUS DI UPDATE
router.patch('/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;


    const product = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            description: productData.description,
            image: productData.image,
            name: productData.name,
            price: productData.price,
        }
    });
    res.send({
        data: product,
        message: "Produk berhasil di update"
    });
});

export default router;
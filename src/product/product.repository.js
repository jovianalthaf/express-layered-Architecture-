// berkomunikasi dengan database
// boleh pake ORM,boleh raw query
// kenapa pakai repository? jika kalau ingin ada perubahan tidak usah ubah servicenya
// contoh ganti ORM dari prisma ke sequelize yang diganti aja dibagian repository saja
// repository = ambil data atau komunikasi dengan database
import prisma from "../utils/db.js"
const findProducts = async () => {
    // const products = await prisma.product.findMany();
    // const products = await prisma.$queryRaw`SELECT * FROM product`
    const products = await prisma.product.findMany({
        include: {
            Category: {
                select: {
                    name: true,
                }
            }
        }
    })
    return products;
}
const findProductById = async (id) => {

    const product = await prisma.product.findUnique({
        where: {
            id: id
        },
        include: {
            Category: {
                select: { name: true, }
            }
        }
    })
    return product;

}

const insertProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price,
            categoryId: newProductData.categoryId
        }
    });
    //     const product = await prisma.$queryRaw`INSERT INTO product (name,description,image,price)  
    //      VALUES (${newProductData.name}, ${newProductData.description}, ${newProductData.image}, ${newProductData.price})
    // `
    return product;
}
export { findProducts, findProductById, insertProduct };
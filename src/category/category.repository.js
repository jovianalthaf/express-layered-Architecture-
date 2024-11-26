import prisma from "../utils/db.js"

const findCategoryRepository = async () => {
    // const products = await prisma.product.findMany();
    // const products = await prisma.$queryRaw`SELECT * FROM product`
    const categories = await prisma.category.findMany();

    return categories;

}

const findCategorybyIdRepository = async (id) => {
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    return category;
}

const insertCategoryRepository = async (newDataCategory) => {
    const category = await prisma.category.create({
        data: {
            name: newDataCategory.name
        }
    });
    return category;

}

export { findCategoryRepository, findCategorybyIdRepository, insertCategoryRepository };
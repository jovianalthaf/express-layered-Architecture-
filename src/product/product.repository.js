// berkomunikasi dengan database
// boleh pake ORM,boleh raw query
import prisma from "../db"
const findProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
}
export { findProducts };
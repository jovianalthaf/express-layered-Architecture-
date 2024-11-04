import prisma from "../utils/db.js"
import bcrypt from "bcrypt";
const createNewUser = async (newUserData) => {
    const salt = await bcrypt.genSalt(10);
    newUserData.password = await bcrypt.hash(newUserData.password, salt);

    const user = await prisma.user.create({
        data: {
            name: newUserData.name,
            email: newUserData.email,
            role: "USER",
            password: newUserData.password,
            isVerified: null,
            EmailVerifiedAt: null,
            refreshToken: null,
        }
    });

    return user;
}
// const findUserEmail = async (email) => {
//     const user = await prisma.user.findUnique({
//         email: email,
//     })
// }


// contoh reusable
const checkEmail = async (email) => {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })
    return user;
}

const findIdUserAndToken = async (id, refreshToken) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                refreshToken: refreshToken,
            },
        });
        return user;
    } catch (error) {
        console.error("Error updating refreshToken:", error);
        throw new Error("Failed to update refreshToken");
    }
}

const findIdUser = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: false,
            refreshToken: true,
        }
    })

    return user;
}

const findUserAdmin = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
            role: 'ADMIN'
        }
    })
    return user;
}


export { createNewUser, checkEmail, findIdUserAndToken, findIdUser, findUserAdmin };
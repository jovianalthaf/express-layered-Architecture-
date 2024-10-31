import prisma from "../db/index.js"
const createNewUser = async (newUserData) => {
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

const checkEmail = async (email) => {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })
    return user;
}

export { createNewUser, checkEmail };
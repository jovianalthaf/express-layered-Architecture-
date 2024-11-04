import prisma from "../utils/db.js";
import bcrypt from "bcrypt";
import { createNewUser, checkEmail, findIdUserAndToken, findIdUser, findUserAdmin } from "../auth/auth.repository.js";

const RegisterUser = async (newUserData) => {
    const user = await createNewUser(newUserData);
    return user;
}

const EmailUser = async (email) => {
    const user = await checkEmail(email);
    return user;
}
const userAndToken = async (id, refreshToken) => {
    return await findIdUserAndToken(id, refreshToken);

}

const findUserById = async (id) => {
    const user = await findIdUser(id);
    return user;
}

const findAdmin = async (id) => {
    const user = await findUserAdmin(id);
    return user;
}

export { RegisterUser, EmailUser, userAndToken, findUserById, findAdmin };
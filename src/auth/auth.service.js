import prisma from "../db/index.js";
import { createNewUser, checkEmail } from "../auth/auth.repository.js";
const RegisterUser = async (newUserData) => {
    const user = await createNewUser(newUserData);
    return user;
}

const EmailUser = async (email) => {
    const user = await checkEmail(email);
    return user;
}
export { RegisterUser, EmailUser };
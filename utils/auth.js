import { compare, hash } from "bcryptjs";

export async function encryptPassword(pass){
    const encryptedPass = await hash(pass,14)
    return encryptedPass
}

export async function verifyPassword(password,encPass){
    const isValid = await compare(password,encPass)
    return isValid
}
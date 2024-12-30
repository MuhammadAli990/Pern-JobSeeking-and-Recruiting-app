import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const secret_key = process.env.SECRET_KEY;

export const verifyUserCookie = async (token) => {
    let userInfo;
    jwt.verify(token, secret_key, {}, (err, info) => {
        if (err) {
           userInfo = null;
        }
        userInfo = info;
    })
    return userInfo;
}
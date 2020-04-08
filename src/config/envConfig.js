import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const TOKEN_EXPIRED_TIME = process.env.TOKEN_EXPIRED_TIME;
export const PORT = process.env.PORT;

const envConfig = {
    JWT_SECRET,
    TOKEN_EXPIRED_TIME,
    PORT
}

export default envConfig;

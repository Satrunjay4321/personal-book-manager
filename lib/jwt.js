import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId) => {
    return jwt.sign(
        { userId: userId.toString() },
        JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (res , userId) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSize:'strict',
        maxAge: 7 * 24 * 69 * 60 * 1000, // 7 days
    });

    return token;
} 
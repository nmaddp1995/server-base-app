import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/envConfig';

const auth = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log('error here');
        console.error(err);
        res.status(500).send({
            message: 'Invalid token'
        })
    }
};

export default auth;
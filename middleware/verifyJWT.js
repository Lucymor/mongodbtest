import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
configDotenv({ path: '.env' });

export function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.sendStatus(403);
        }
        req.user = decoded.username;
        next();
    });
}
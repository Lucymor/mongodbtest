import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function handleLogin(req, res) {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
        return res.send('No such user').status(401);
    }

    if (user.password !== req.body.password) {
        return res.send('Password mismatch').status(401);
    }

    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
    const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.send({ accessToken }).status(200);
};
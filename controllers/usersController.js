import { User } from '../models/User.js';

export const handleGetAllUsers = async (req, res) => {
    let results = await User.find({}, 'username').exec();
    res.send(results).status(200);
};

export const handleGetMe = async (req, res) => {
    const user = await User.findOne({ username: req.user }).exec();
    if (!user) return res.sendStatus(403);
    res.send(user).status(200);
};

export const getUserByParamId = async (req, res) => {
    const user = await User.findById(req.params.id, 'username').exec();
    res.send(user).status(200);
};

export const handleNewUser = async (req, res) => {
    const user = await User.create(req.body);
    res.send(user).status(204);
};

export const handleEditUser = async (req, res) => {
    const user = await User.findById(req.params.id, 'username').exec();
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    await user.save();
    res.send(user).status(200);

};

export const handleDeleteUser = async (req, res) => {
    let user = await User.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
};

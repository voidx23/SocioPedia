import User from "../models/User.js";
import Post from "../models/Post.js"


export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        console.log(user)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const viewPost = async (req, res) => {
    try {
        console.log(req.params.id);

        const post = await Post.find({ userId: req.params.id });
        return res.status(200).json([post]);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const handleBlock = async (req, res) => {
    try {
        console.log("vfhbcsna")
        const user = await User.findById(req.params.id);
        user.isBlocked = !(user.isBlocked); // Toggle the isBlocked status
        console.log(user.isBlocked)
        await user.save(); // Save the updated user
        return res.status(200).json(user.isBlocked);
    } catch (error) {
        return res.status(500).json(error);
    }
}
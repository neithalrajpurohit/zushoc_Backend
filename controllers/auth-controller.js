const User = require("../model/user.model.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createToken = (id) => {
    return jwt.sign({ id }, secret);
};
module.exports.signup_post = async (req, res) => {
    let {
        name,
        username,
        email,
        password,
        bio,
        profileURL,
        followingList,
        followersList,
    } = req.body;
    try {
        const user = await User.create({
            name,
            username,
            email,
            password,
            bio,
            profileURL,
            followingList,
            followersList,
        });
        const token = createToken(user._id);
        res.json({
            name,
            username,
            email,
            token,
            bio,
            profileURL,
            followingList,
            followersList,
        });
    } catch (err) {
        console.log({ err });
        res.json({ err });
    }
};
module.exports.login_post = async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.json({ user, token });
    } catch (err) {
        console.log(err.message);
        res.status(402).json({ err: err.message });
    }
};
module.exports.getFollowSuggestions = async (req, res) => {
    try {
        const user = await User.find({})
            .sort({
                createdAt: "desc",
            })
            .limit(5);
        res.json({ user });
    } catch (err) {
        console.log({ err });
        res.json({ err });
    }
};
module.exports.getUserData = async (req, res) => {
    try {
        const { username } = req.params;
        const userDetails = await User.findOne({ username });
        res.json({ success: true, userDetails });
    } catch (err) {
        console.log({ err });
        res.json({ err });
    }
};
module.exports.addNewFollowing = async (req, res) => {
    try {
        const { userId, followUserId } = req.body;
        const mainUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { followingList: followUserId },
            },
            { new: true }
        );
        const followUser = await User.findByIdAndUpdate(
            followUserId,
            {
                $push: { followersList: userId },
            },
            { new: true }
        );
        res.json({ mainUser, followUser });
    } catch (err) {
        console.log({ err });
        res.json({ err });
    }
};

module.exports.removeFollowing = async (req, res) => {
    try {
        const { userId, followUserId } = req.body;
        const mainUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { followersList: followUserId },
            },
            { new: true }
        );
        const followUser = await User.findByIdAndUpdate(
            followUserId,
            {
                $pull: { followersList: userId },
            },
            { new: true }
        );
        res.json({ mainUser, followUser });
    } catch (err) {
        console.log({ err });
        res.json({ err });
    }
};

exports.getLoggedInInfo = async (req, res) => {
    try {
        const userDetails = await User.findById(req.userId);

        res.json({ success: true, userDetails });
    } catch (err) {
        console.log({ err });
        res.json({ err });
    }
};

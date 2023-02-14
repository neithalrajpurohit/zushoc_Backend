const mongoose = require("mongoose");
const User = require("../model/user.model.js");
const { Post } = require("../model/post.model.js");

const Limit = 20;
const getFeed = async (req, res) => {
    try {
        let _id = req.userId;

        const followingUsers = await User.findById({ _id }).exec();
        const response = await Post.find({
            userId: { $in: [...followingUsers.followingList, _id] },
        })
            .populate({
                path: "userId",
                select: "name username bio profileURL",
            })
            .populate({
                path: "likedBy",
                select: "name username bio profileURL",
            })
            .sort("-createdAt")
            .limit(Limit);
        res.json({ success: true, response });
    } catch (err) {
        console.log({ err });
        res.json({ success: false, err });
    }
};
module.exports = { getFeed };

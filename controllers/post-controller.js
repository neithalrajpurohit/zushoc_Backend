const _ = require("lodash");
const { Post } = require("../model/post.model.js");
const User = require("..//model/user.model.js");
const { getArrayofUniqueIds } = require("../utils");

const createNewPost = async (req, res) => {
    try {
        const { post } = req.body;
        let newPost = new Post({
            userId: req.userId,
            content: post.content,
            postImage: post.imageURL,
        });
        let newPostWithUser = await newPost.save();
        newPostWithUser = await newPostWithUser.populate("userId");

        res.json({ sucess: true, data: newPostWithUser });
    } catch (err) {
        console.log({ err });
        res.json({ sucess: false, err });
    }
};
const getAllPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const userId = await User.findOne({ username }, "_id");
        const post = await Post.find({ userId: userId }).sort("-createdAt");
        res.json({ sucess: true, post });
    } catch (err) {
        console.log({ err });
        res.json({ sucess: false, err });
    }
};
const deletePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        res.json({ sucess: true, post });
    } catch (err) {
        console.log({ err });
        res.json({ sucess: false, err });
    }
};
const likeUserPost = async (req, res) => {
    try {
        console.log(req.params, req.body);
        const { postId } = req.params;
        const { userId } = req.body;
        console.log(userId, postId, "like post fun");
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { likedBy: userId },
            },
            { new: true }
        )
            .populate("likedBy", "username")
            .exec();
        res.json({ sucess: true, post });
    } catch (err) {
        console.log(err);
        res.json({ sucess: false, err });
    }
};
const unlikeUserPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const { userId } = req.body;

        const post = await Post.findById(postId);
        post.likedBy.pull(userId);
        await post.save();
        res.json({ sucess: true, userId, post });
    } catch (err) {
        console.log({ err });
        res.json({ sucess: false, err });
    }
};
module.exports = {
    createNewPost,
    getAllPosts,
    deletePosts,
    likeUserPost,
    unlikeUserPost,
};

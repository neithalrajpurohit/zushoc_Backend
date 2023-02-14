const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middlewares/auth-middleware.js');
const {
    createNewPost,
    getAllPosts,
    deletePosts,
    likeUserPost,
    unlikeUserPost } = require('../controllers/post-controller.js');
router.route("/userpost/:username")
    .get(requireAuth, getAllPosts)
router.route("/")
    .post(requireAuth, createNewPost)
router.route("/:id")
    .delete(requireAuth, deletePosts)
router.route("/like/:postId")
    .put(requireAuth, likeUserPost)
router.route("/unlike/:postId")
    .post(requireAuth, unlikeUserPost)
module.exports = router;
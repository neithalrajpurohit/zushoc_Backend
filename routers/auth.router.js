const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth-controller.js');
const { requireAuth } = require('../middlewares/auth-middleware')
let { signup_post, login_post, getFollowSuggestions, getUserData, addNewFollowing, removeFollowing, getLoggedInInfo } = authController;

router.get("/user", requireAuth, getLoggedInInfo)
router.post('/signup/new', signup_post);
router.post('/login', login_post);
router.get('/getall', getFollowSuggestions);
router.get('/:username', getUserData);
router.post('/follow/new', addNewFollowing);
router.post('/follow/remove', removeFollowing);


module.exports = router;
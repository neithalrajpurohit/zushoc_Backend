const {Router} = require('express');
const router = Router();
const {requireAuth}=require('../middlewares/auth-middleware.js');
const {getFeed} = require('../controllers/feed-controller.js');

router.route("/")
.get(requireAuth,getFeed);

module.exports=router;
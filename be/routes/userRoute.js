import express from "express";
import { Logout,Login, Register, bookmarks, getMyProfile, getOtherUser, followOrUnfollow, editProfile } from "../controllers/userController.js";
import { likeOrDislike } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmark/:id").put(isAuthenticated,bookmarks);
router.route("/profile/:id").get(isAuthenticated,getMyProfile);
router.route("/otherUsers/:id").get(isAuthenticated,getOtherUser);
router.route("/followOrUnfollow/:id").post(isAuthenticated,followOrUnfollow);
router.route("/editProfile/:id").put(isAuthenticated,editProfile)

export default router;

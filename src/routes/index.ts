import express from "express";
import { createPostHandler, famousPostHandler, getAllPostsHandler, likePostHandler } from "../controller/post.controller";
import { createUserHandler, getAllUsersHandler, getUserHandler, logingUserHandler } from "../controller/user.controller";

const router = express.Router();

// User routes
router.get("/api/user/all", getAllUsersHandler)
router.post("/api/user/login", logingUserHandler)
router.get("/api/user/:name", getUserHandler)
router.post("/api/user", createUserHandler)

/* Post routes */
router.get("/api/post/all", getAllPostsHandler)
router.post("/api/post", createPostHandler)
router.post("/api/post/like", likePostHandler)
router.get("/api/post/famous", famousPostHandler)

export default router;
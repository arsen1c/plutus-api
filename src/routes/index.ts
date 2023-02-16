import express from "express";
import { createPostHandler, getAllPostsHandler, likePostHandler } from "../controller/post.controller";
import { createUserHandler, getAllUsersHandler, getUserHandler } from "../controller/user.controller";

const router = express.Router();

// User routes
router.get("/api/user/all", getAllUsersHandler)
router.get("/api/user/:name", getUserHandler)
router.post("/api/user", createUserHandler)

/* Post routes */
router.get("/api/post/all", getAllPostsHandler)
router.post("/api/post", createPostHandler)
router.post("/api/post/like", likePostHandler)

export default router;
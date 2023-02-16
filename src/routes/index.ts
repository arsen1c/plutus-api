import express from "express";
import { createPostHandler } from "../controller/post.controller";
import { createUserHandler, getAllUsersHandler, getUserHandler } from "../controller/user.controller";

const router = express.Router();

router.get("/api/user/all", getAllUsersHandler)
router.get("/api/user/:name", getUserHandler)
router.post("/api/user", createUserHandler)
router.post("/api/post", createPostHandler)

export default router;
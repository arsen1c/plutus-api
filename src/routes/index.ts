import express from "express";
import { createUserHandler, getUserHandler } from "../controller/user.controller";

const router = express.Router();

router.get("/api/users", getUserHandler)
router.post("/api/user", createUserHandler)

export default router;
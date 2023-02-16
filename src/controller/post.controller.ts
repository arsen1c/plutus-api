import { Request, Response } from "express";
import { PostInput } from "../models/post.model";
import { createPost } from "../service/post.service";

export async function createPostHandler(req: Request, res: Response) {
    try {
        const body: PostInput = req.body;
        const post = await createPost(body);

        return res.status(201).send(post);
    } catch (error: any) {
        return res.status(409).send(error.message)
    }
}
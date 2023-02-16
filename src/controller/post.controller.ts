import { Request, Response } from "express";
import { PostInput } from "../models/post.model";
import { createPost, getAllPosts, postLike } from "../service/post.service";

export async function createPostHandler(req: Request, res: Response) {
    try {
        const body: PostInput = req.body;
        const post = await createPost(body);

        return res.status(201).send(post);
    } catch (error: any) {
        return res.status(409).send(error.message)
    }
}

export async function getAllPostsHandler(req: Request, res: Response) {
    try {
        const posts = await getAllPosts();
        return res.status(200).send(posts);
    } catch (error: any) {
        return res.status(404).send(error.message)
    }
}

export async function likePostHandler(req: Request, res: Response) {
    try {
        const body = req.body;
        const posts = await postLike(body);

        return res.status(201).send(posts)
    } catch (error: any) {
        return res.status(409).send(error.message)
    }
}
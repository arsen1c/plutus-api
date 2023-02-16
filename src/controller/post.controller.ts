import { NextFunction, Request, Response } from "express";
import { PostInput } from "../models/post.model";
import { createPost, famousPosts, getAllPosts, postLike } from "../service/post.service";

export async function createPostHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const body: PostInput = req.body;
        const post = await createPost(body);

        return res.status(201).send(post);
    } catch (error: any) {
        next(error);
    }
}

export async function getAllPostsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await getAllPosts();
        return res.status(200).send(posts);
    } catch (error: any) {
        next(error);
    }
}

export async function likePostHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        const posts = await postLike(body);

        return res.status(201).send(posts)
    } catch (error: any) {
        next(error);
    }
}

export async function famousPostHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await famousPosts();

        res.status(200).send(posts);
    } catch (error: any) {
        next(error);
    }
}
import PostModel, { PostInput } from "../models/post.model";
import UserModel from "../models/user.model";

export async function createPost(body: PostInput) {
    try {
        const user = UserModel.findOne({ name: body.user })

        if (!user) {
            throw new Error("User not found!")
        }

        const post = await PostModel.create(body);

        return post;
    } catch (error: any) {
        throw new Error(error);
    }
}
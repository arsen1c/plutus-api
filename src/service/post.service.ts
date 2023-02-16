import { HttpErrorException } from "../exceptions/HttpErrorException";
import PostModel, { PostDocument, PostInput, PostLikeInput } from "../models/post.model";
import UserModel from "../models/user.model";
import { sendMail } from "../utils/sendMail";

export async function createPost(body: PostInput) {
    const user = await UserModel.findOne({ _id: body.user })

    if (!user) {
        throw HttpErrorException.resourceNotFound("User not found!");
    }

    const post = await PostModel.create(body);

    return post;
}

export async function getAllPosts() {
    const posts = await PostModel.find({});
    return posts;
}

export async function postLike(body: PostLikeInput) {
    const post = await PostModel.findOne<PostDocument>({ _id: body.postId });

    if (!post) {
        throw HttpErrorException.resourceNotFound("Invalid post");
    }

    const user = await UserModel.findOne({ _id: post.user });
    if (!user) {
        throw HttpErrorException.resourceNotFound("User not found");
    }
    post.likes++;

    const allPosts: PostDocument[] = await PostModel.find({ user: post.user });

    const average = Math.floor(allPosts.reduce((acc, post) => acc + post.likes, 0) / allPosts.length);

    const famous = average * 3;
    const currentAverage = user.average_likes;
    const newAverage = Math.max(famous, user.average_likes);

    if (newAverage > currentAverage) {
        sendMail(`Sending message cus famous. Average: ${user.average_likes}. Famous: ${famous}`);
    }

    user.average_likes = newAverage;

    await post.save();
    await user.save();

    return post;
}

export async function famousPosts() {
    const posts: PostDocument[] = await PostModel.find({}).sort({ likes: -1 }).limit(10);
    return posts;
}
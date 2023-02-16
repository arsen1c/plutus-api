import mongoose, { mongo } from "mongoose";
import { UserDocument } from "./user.model";

export interface PostInput {
    user: UserDocument["_id"];
    data: string;
}

export interface PostLikeInput {
    user: UserDocument["_id"];
    postId: PostDocument["_id"];
}

export interface PostDocument extends PostInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    likes: number;
}

export const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    data: { type: String, required: true },
    likes: { type: Number, default: 0 }
}, {
    timestamps: true
})

const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;
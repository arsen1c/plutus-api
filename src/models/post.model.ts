import mongoose, { mongo } from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PostInput {
    user: UserDocument["_id"];
    data: string;
}

export interface PostDocument extends PostInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

export const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
        unique: true,
        default: () => `post_${nanoid()}`
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    data: { type: String, required: true },
    likes: { type: Number, default: 0 }
}, {
    timestamps: true
})

const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;
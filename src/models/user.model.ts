import mongoose from "mongoose";
import argon2 from "argon2"
import { postSchema } from "./post.model";

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

export const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

// run this function before actually saving the user
userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    // hash the password 
    const hash = await argon2.hash(user.password);
    // store the hash as the password
    user.password = hash;

    return next();
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<Boolean> {
    const user = this as UserDocument;

    return argon2.verify(candidatePassword, user.password).catch(e => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema)

export default UserModel;
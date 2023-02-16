import mongoose from "mongoose";
import argon2 from "argon2"

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
    average_likes: number;
}

export const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    average_likes: { type: Number, default: 0 }
}, {
    timestamps: true
})

// run this function before actually saving the user
userSchema.pre("save", async function (next) {
    try {
        let user = this as UserDocument;

        if (!user.isModified("password")) {
            return next();
        }

        const hash = await argon2.hash(user.password);
        // store the hash as the password
        user.password = hash;

        return next();
    } catch (error: any) {
        throw new Error(error);
    }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<Boolean> {
    try {
        const user = this as UserDocument;

        // compare the plain text password with the hash of the password
        const isValid = await argon2.verify(user.password, candidatePassword);

        return isValid;
    } catch (error: any) {
        throw new Error("Passwords diddnt not match")
    }

}

const UserModel = mongoose.model<UserDocument>("User", userSchema)

export default UserModel;
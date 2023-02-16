import UserModel, { UserInput } from "../models/user.model";

export interface ISignin {
    name: string;
    password: string;
}

export async function getAllUsers() {
    try {
        const users = await UserModel.find({}).select("-password");
        return users;
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getUser(name: string) {
    try {
        const user = await UserModel.findOne({ name }).select("-password");

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createUser(input: UserInput) {
    try {
        const userRecord = await UserModel.create(input);

        const user = userRecord.toObject();
        // Remove password property from the user user object
        Reflect.deleteProperty(user, "password");

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function loginUser(body: ISignin) {
    try {
        const userRecord = await UserModel.findOne({ name: body.name });
        if (!userRecord) throw new Error("User not found");

        const isValidPassword = await userRecord.comparePassword(body.password);
        if (!isValidPassword) throw new Error("Invalid password");

        const user = userRecord.toObject();
        // Remove the password property
        Reflect.deleteProperty(user, "password")

        return user;
    } catch (error: any) {
        throw new Error(error)
    }

} 
import { HttpErrorException } from "../exceptions/HttpErrorException";
import UserModel, { UserInput } from "../models/user.model";

export interface ISignin {
    name: string;
    password: string;
}

export async function getAllUsers() {
    const users = await UserModel.find({}).select("-password");
    return users;
}

export async function getUser(name: string) {
    const user = await UserModel.findOne({ name }).select("-password");

    if (!user) throw HttpErrorException.resourceNotFound("User not found");

    return user;
}

export async function createUser(input: UserInput) {
    const userRecord = await UserModel.create(input);

    const user = userRecord.toObject();
    // Remove password property from the user user object
    Reflect.deleteProperty(user, "password");

    return user;
}

export async function loginUser(body: ISignin) {
    const userRecord = await UserModel.findOne({ name: body.name });
    if (!userRecord) throw HttpErrorException.resourceNotFound("User not found!");

    const isValidPassword = await userRecord.comparePassword(body.password);
    if (!isValidPassword) throw HttpErrorException.unAuthorized("Invalid password");

    const user = userRecord.toObject();
    // Remove the password property
    Reflect.deleteProperty(user, "password")

    return user;
} 
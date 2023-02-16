import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function getUsers() {
    try {
        const users = await UserModel.find({});

        return users;
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
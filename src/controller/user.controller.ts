import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import { createUser, getUsers } from "../service/user.service";

export async function getUserHandler(req: Request, res: Response) {
    try {
        const users: UserDocument[] = await getUsers();

        return res.status(200).send(users)
    } catch (error: any) {
        return res.status(404).send(error.message)
    }
}

export async function createUserHandler(req: Request, res: Response) {
    try {
        const body: UserInput = req.body;

        const user = await createUser(body);
        return res.send(user);
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}
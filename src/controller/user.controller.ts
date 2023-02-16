import { Request, Response } from "express";
import { UserInput } from "../models/user.model";
import { createUser, getAllUsers, getUser } from "../service/user.service";

export async function getAllUsersHandler(req: Request, res: Response) {
    try {
        const users = await getAllUsers();
        return res.status(200).send(users)
    } catch (error: any) {
        res.send(404).send(error.message)
    }
}

export async function getUserHandler(req: Request, res: Response) {
    try {
        const name = req.params.name;
        const user = await getUser(name);

        if (!user) {
            return res.status(404);
        }

        return res.status(200).send(user)
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
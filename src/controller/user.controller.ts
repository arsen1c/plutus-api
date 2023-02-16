import { NextFunction, Request, Response } from "express";
import { UserInput } from "../models/user.model";
import { createUser, getAllUsers, getUser, ISignin, loginUser } from "../service/user.service";

export async function getAllUsersHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getAllUsers();
        return res.status(200).send(users)
    } catch (error: any) {
        next(error);
    }
}

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const name = req.params.name;
        const user = await getUser(name);

        if (!user) {
            return res.status(404).send();
        }

        return res.status(200).send(user)
    } catch (error: any) {
        next(error);
    }
}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const body: UserInput = req.body;

        const user = await createUser(body);
        return res.send(user);
    } catch (error: any) {
        next(error);
    }
}

export async function logingUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const body: ISignin = req.body;
        const user = await loginUser(body);

        return res.status(200).send(user);
    } catch (error: any) {
        next(error);
    }
}
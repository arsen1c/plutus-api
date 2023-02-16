import { HttpErrorException } from "../exceptions/HttpErrorException";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: HttpErrorException, req: Request, res: Response, next: NextFunction) => {

    let status: number = 500;

    let data = {
        message: "Internal server error",
        ...(process.env.NODE_ENV === "development" && { originalError: error.message }),
    }

    if (error instanceof HttpErrorException) {
        status = error.status;
        data.message = error.message;
    }


    return res.status(status).json(data);

}
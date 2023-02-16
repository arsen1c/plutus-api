import mongoose from "mongoose";
import { DB_URL, DB_NAME } from "../config";

export default async function connect() {
    const dbUri: string = DB_URL as string;
    const dbName: string = DB_NAME as string;

    try {
        await mongoose.connect(dbUri, { dbName });
        console.log("DB Connected");
    } catch (error: any) {
        console.error("Could not connect to db");
        process.exit(1);
    }
}
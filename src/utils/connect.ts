import mongoose from "mongoose";
import { DB_URL } from "../config";

export default async function connect() {
    const dbUri: string = DB_URL as string;

    try {
        await mongoose.connect(dbUri);
        console.log("DB Connected");

    } catch (error: any) {
        console.error("Could not connect to db");
        process.exit(1);
    }
}
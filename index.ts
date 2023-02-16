import express from "express";
import { PORT } from "./src/config";
import connect from "./src/utils/connect";
import router from "./src/routes";

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(PORT, async () => {
    await connect();
})
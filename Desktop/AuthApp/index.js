import express from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
// import morgan from "morgan";

import user from "./routes/user.js"

const app = express();


config({ path: "./config/config.env" })
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send('Hello World');
})


// route import and mount
app.use("/api/v1", user);


app.listen(process.env.PORT, () => {
    console.log(`Server Listening on port ${process.env.PORT}`);
});

dbConnection();
export default app;
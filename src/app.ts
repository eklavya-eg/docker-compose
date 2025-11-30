import express, { Application } from "express";
import userRouter from "./routes/user";

class App {
    app: Application
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares = () => {
        this.app.use(express.json());
    }
    initializeRoutes = () => {
        this.app.use("/user", userRouter);
        this.app.get("/", (req, res) => {
            res.send("hello world")
        })
    }
}

const app = new App().app
export default app
import { Request, Response, Router } from "express";
import prisma from "../db/prisma";

class UserRouter{
    router: Router
    constructor(){
        this.router = Router()
        this.initializeRoutes();
    }
    initializeRoutes=()=>{
        this.router.get("/:id", async (req:Request, res: Response)=>{
            const id = req.params.id;
            const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id)
                }
            })
            if(user){
                return res.json({
                    user
                })
            }
            return res.status(404).json({
                message: "Not Found"
            })
        })

        this.router.get("/", async (req, res)=>{
            const users = await prisma.user.findMany();
            res.json({user:users})
        })

        this.router.post("/", async (req, res)=>{
            const name: string = req.body.name;
            const user = await prisma.user.create({
                data: {
                    user: name
                }
            })
            res.json({user:user})
        })
    }
}

const userRouter = new UserRouter().router
export default userRouter
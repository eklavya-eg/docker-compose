import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";


const prisma = new PrismaClient();
export const run_migrations = ()=>{
    console.log("Running migrations if any...")
    execSync("npx prisma migrate deploy", { stdio: "inherit" })
}
export const connect_prisma = async ()=>{
    await prisma.$connect();
    console.log("✅ Connected to prisma")
}
export default prisma

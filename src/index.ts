import dotenv from "dotenv";
import path from "path";
dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import app from "./app";
import prisma, { connect_prisma, run_migrations } from "./db/prisma";

async function start_server() {
    try {
        run_migrations()
        await connect_prisma();
        app.listen(process.env.PORT, (error) => {
            if (error) {
                console.log("❌ Error starting server at", process.env.PORT, error)
                prisma.$disconnect()
                process.exit(1)
            } else {
                console.log("✅ Server Started at", process.env.PORT);
            }
        })
    } catch (error) {
        console.log("❌ Error connecting to prisma", error)
        process.exit(1)
    }
}

start_server()

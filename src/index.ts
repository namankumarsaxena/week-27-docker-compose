import express, { type Request, type Response } from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const app  = express();
const PORT = 3000 ;
app.use(express.json());

const prismaClient = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})

app.get("/", async (req:Request, res:Response) => {
    const data = await prismaClient.user.findMany()
    res.json({
        data
    })
})
app.post("/", async (req:Request, res:Response) => {
    await prismaClient.user.create({
    data:{
        username: Math.random().toString(),
        password: Math.random().toString()
    }
    })
    res.json({
        "message": "post endpoint"
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

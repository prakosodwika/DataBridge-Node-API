import { PrismaClient } from "@prisma/client"
import { seedAdmin } from "./seedAdmin"

const prisma = new PrismaClient()

async function seed(){
    await seedAdmin(prisma)
    // Seed Function Call Goes Here
   
}

seed().then(()=>{
    console.log("ALL SEEDING DONE")
})
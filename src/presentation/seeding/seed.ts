import { prisma } from "@/infrastructure/db"
 


async function main() {
    await prisma.user.create({
        data: {
            email: "test@gmail.com",
            name: "TesterV1",
            password_hash: "",
            
        }
    })
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect()
})
import { prisma } from "@/infrastructure/db";

async function processOutbox() {
    const user_events = await prisma.outboxEvent.findMany({
        where: {
            status: "PENDING"
        },
        take: 10
    });

    for (const event of user_events) {
        console.log("Processing the event")
    }
}

processOutbox();
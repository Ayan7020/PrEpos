import { prisma } from "@/lib/prisma";


async function processOutbox() {
    const user_events = await prisma.user_OutBox.findMany({
        where: {
            status: "Pending"
        },
        take: 10
    });

    for (const event of user_events) {
        console.log("Processing the event")
    }
}

processOutbox();
import { auth } from "@clerk/nextjs/server"
import prisma from "./prisma"

export const authenticateUser = async () => {
    const { userId } = await auth()
    if (!userId) {
        throw new Error("Not authorized")
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        },
        include: {
            industryInsight: true
        }
    })
    return user
}
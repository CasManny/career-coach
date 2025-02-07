import { auth } from "@clerk/nextjs/server"
import prisma from "./prisma"
import { redirect } from "next/navigation"

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
            industryInsight: true,
        }
    })
    if (!user) {
        return redirect("/sign-in")
    }   
    return user
}
"use server"

import prisma from "@/lib/prisma"
import { onboardingSchema } from "@/lib/schemas"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"

export const updateUser = async (data: z.infer<typeof onboardingSchema>) => {
    const { userId } = await auth()
    if (!userId) {
        return { success: false, message: "Unauthorized user"}
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    if (!user) {
        return { success: false, message: "User not found"}
    }

    try {
        const result = await prisma.$transaction(
            async (tx) => {
                let industryInsights = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry
                    }
                })

                if (!industryInsights) {
                    industryInsights = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            demandLevel: "MEDIUM",
                            topSkills: [],
                            marketOutlook: 'NEUTRAL',
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        }
                    })
                }

                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills
                    }
                })

                return { updatedUser, industryInsights}
            }, { timeout: 1000}
        )


        return result.updatedUser
    } catch (error) {
        return { success: false, message: "Internal server error"}
    }
}

type OnboardingStatusResponse = { success: boolean; message: string }

export const getUserOnboardingStatus = async (): Promise<OnboardingStatusResponse> => {
    const { userId } = await auth()
    if (!userId) {
        return { success: false, message: "Unauthorized user"}
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    if (!user) {
        return { success: false, message: "User not found"}
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true
            }
        })

        return { success: !!user?.industry, message: "Industry found"}


    } catch (error) {
        return { success: false, message: "Internal server error" };
    }

}
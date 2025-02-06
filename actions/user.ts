"use server";

import prisma from "@/lib/prisma";
import { onboardingSchema } from "@/lib/schemas";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { generateAIInsight } from "./dashboard";
type OnboardingStatusResponse = { success: boolean; message: string };

export const updateUser = async (data: z.infer<typeof onboardingSchema>) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized user" };
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    let industryInsight = await prisma.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    if (!industryInsight) {
      const insights = await generateAIInsight(data.industry);
      industryInsight = await prisma.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: data.industry,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
      },
    });

    return { success: true, message: "User information updated successfully" };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};



export const getUserOnboardingStatus =
  async (): Promise<OnboardingStatusResponse> => {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized user" };
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: userId,
        },
        select: {
          industry: true,
        },
      });

      return { success: !!user?.industry, message: "Industry found" };
    } catch (error) {
      return { success: false, message: "Internal server error" };
    }
  };

"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateAIInsight = async (industry: string) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "High" | "Medium" | "Low",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "Positive" | "Neutral" | "Negative",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 5 common roles for salary ranges.
    Growth rate should be a percentage.
    Include at least 5 skills and trends.
  `;
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const cleanedText = response.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleanedText);
};

import { authenticateUser } from "@/lib/authenticate-user";
import prisma from "@/lib/prisma";

export const getIndustryInsights = async () => {
  const user = await authenticateUser();

  if (!user?.industryInsight) {
    const insights = await generateAIInsight(
      user?.industryInsight?.industry as string
    );
    const industryInsight = await prisma.industryInsight.create({
      data: {
        industry: user?.industryInsight?.industry as string,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
};

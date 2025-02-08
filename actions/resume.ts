import { authenticateUser } from "@/lib/authenticate-user";
import { model } from "@/lib/geminiAI";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const saveResume = async (content: string) => {
  const user = await authenticateUser();
  try {
    const resume = await prisma.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });
    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.log("Error in saving resume");
  }
};

export const getResume = async () => {
    const user = await authenticateUser()
    return prisma.resume.findUnique({
        where: {
            userId: user.id
        }
    })
}

interface improveWithAIProps {
    current: string,
    type: string
}

export const improveWithAI = async ({ current, type}: improveWithAIProps) => {
    const user = await authenticateUser()
    const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;
    try {
        const result = await model.generateContent(prompt)
        const improvedContent = result.response?.text().trim()
        return improvedContent
    } catch (error) {
        console.log("Error in improving with ai")
    }
}

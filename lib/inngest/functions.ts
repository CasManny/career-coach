import { model } from "../geminiAI";
import prisma from "../prisma";
import { inngest } from "./client";

export const generateIndustryInsights = inngest.createFunction(
  { id: "Generate-industry-insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    const industries = await step.run("fetch-industries", async () => {
      return await prisma.industryInsight.findMany({
        select: {
          industry: true,
        },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
            Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
            {
              "salaryRanges": [
                { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
              ],
              "growthRate": number,
              "demandLevel": "HIGH" | "MEDIUM" | "LOW",
              "topSkills": ["skill1", "skill2"],
              "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
              "keyTrends": ["trend1", "trend2"],
              "recommendedSkills": ["skill1", "skill2"]
            }
            
            IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
            Include at least 5 common roles for salary ranges.
            Growth rate should be a percentage.
            Include at least 5 skills and trends.
          `;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await model.generateContent(p);
        },
        prompt
      );

      // Log response for debugging
      console.log("AI Response:", JSON.stringify(res, null, 2));

      // Extracting the first candidate safely
      const candidate = res?.response?.candidates?.[0];

      // Extract text from different possible structures
      let text = "";
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if ("text" in part) {
            text += part.text; // Concatenating in case there are multiple parts
          }
        }
      }

      if (!text) {
        console.error(`No valid text response for industry: ${industry}`);
        continue;
      }

      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      let insights;
      try {
        insights = JSON.parse(cleanedText);
      } catch (error) {
        console.error(`JSON parsing error for industry: ${industry}`, error, cleanedText);
        continue;
      }

      await step.run(`Update ${industry} insights`, async () => {
        await prisma.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);

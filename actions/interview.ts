"use server";

import { authenticateUser } from "@/lib/authenticate-user";
import { model } from "@/lib/geminiAI";
import prisma from "@/lib/prisma";

type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
};

type QuizResponse = {
  questions: QuizQuestion[];
};

type QuizAnswer = string;

type QuestionResult = {
  question: string;
  answer: string;
  userAnswer: string;
  isCorrect: boolean;
  explanation: string;
};

type Assessment = {
  userId: string;
  quizScore: number;
  questions: QuestionResult[];
  category: string;
  improvementTip?: string | null;
};

export async function generateQuiz(): Promise<QuizQuestion[]> {
  const user = await authenticateUser();
  const prompt = `
      Generate 10 technical interview questions for a ${
        user.industry
      } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
      
      Each question should be multiple choice with 4 options.
      
      Return the response in this JSON format only, no additional text:
      {
        "questions": [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": "string",
            "explanation": "string"
          }
        ]
      }
    `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response?.text().trim() ?? "";
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz: QuizResponse = JSON.parse(cleanedText);
    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(
  questions: QuizQuestion[],
  answers: QuizAnswer[],
  score: number
): Promise<Assessment> {
  const user = await authenticateUser();

  const questionResults: QuestionResult[] = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip: string | null = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
        The user got the following ${user.industry} technical interview questions wrong:
        
        ${wrongQuestionsText}
        
        Based on these mistakes, provide a concise, specific improvement tip.
        Focus on the knowledge gaps revealed by these wrong answers.
        Keep the response under 2 sentences and make it encouraging.
        Don't explicitly mention the mistakes, instead focus on what to learn/practice.
      `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);
      improvementTip = tipResult.response?.text().trim() ?? null;
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  try {
    const assessment = await prisma.assessments.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTips: improvementTip,
      },
    });
      
      return JSON.parse(JSON.stringify(assessment))

  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}



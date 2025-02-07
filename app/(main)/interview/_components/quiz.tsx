"use client";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./quiz-result";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch<QuizQuestion[]>(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData && Array.isArray(quizData)) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((ans, index) =>
        index === currentQuestion ? answer : ans
      )
    );
  };

  const handleNext = () => {
    if (currentQuestion >= (quizData?.length || 0) - 1) {
      finishQuiz();
      return; // Prevent further execution
    }
  
    setShowExplanation(false);
    setCurrentQuestion((prev) => prev + 1);
  };

  const calculateScore = (): number => {
    if (!quizData) return 0;
    const correct = answers.reduce(
      (acc, answer, index) =>
        answer === quizData[index].correctAnswer ? acc + 1 : acc,
      0
    );
    return (correct / quizData.length) * 100;
  };


  const finishQuiz = async () => {
    if (!quizData) return;
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save quiz results"
      );
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(undefined);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }
    
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData}  onStartNew={startNewQuiz} />
      </div>
    );
  }

  const question = quizData[currentQuestion] || null;

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question?.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion] || ""}
          className="space-y-2"
        >
          {question?.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question?.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

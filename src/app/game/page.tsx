"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AnswerOption from "@/components/shared/AnswerOption/AnswerOption";
import PrizeList from "@/components/shared/PrizeList/PrizeList";
import Question from "@/components/shared/Question/Question";
import { AnswerState } from "@/constants/answerState";
import { ROUTES } from "@/constants/routes";
import useGame from "@/hooks/useGame";

import styles from "./page.module.scss";

export default function GamePage() {
  const router = useRouter();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    gameStatus,
    answerQuestion,
  } = useGame();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>(
    {}
  );
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (gameStatus === "idle") {
      router.replace(ROUTES.HOME);
    }
    if (gameStatus === "won" || gameStatus === "lost") {
      router.replace(ROUTES.RESULT);
    }
  }, [gameStatus, router]);

  useEffect(() => {
    setSelectedId(null);
    setAnswerStates({});
    setIsRevealing(false);
  }, [currentQuestionIndex]);

  const handleAnswer = (id: string) => {
    if (isRevealing || selectedId !== null) return;

    setSelectedId(id);
    setAnswerStates({ [id]: AnswerState.SELECTED });
    setIsRevealing(true);

    setTimeout(() => {
      if (!currentQuestion) return;

      const newStates: Record<string, AnswerState> = {};
      currentQuestion.answers.forEach((answer) => {
        if (answer.isCorrect) {
          newStates[answer.id] = AnswerState.CORRECT;
        } else if (answer.id === id) {
          newStates[answer.id] = AnswerState.WRONG;
        }
      });
      setAnswerStates(newStates);

      setTimeout(() => {
        answerQuestion([id]);
      }, 800);
    }, 1000);
  };

  if (!currentQuestion || gameStatus !== "playing") {
    return null;
  }

  return (
    <main className={styles.container}>
      <div className={styles.game}>
        <div className={styles.questionArea}>
          <Question
            text={currentQuestion.question}
            number={currentQuestionIndex + 1}
            total={totalQuestions}
          />
          <div className={styles.answers}>
            {currentQuestion.answers.map((answer) => (
              <AnswerOption
                key={answer.id}
                answer={answer}
                state={answerStates[answer.id] ?? AnswerState.IDLE}
                onClick={handleAnswer}
                disabled={isRevealing}
              />
            ))}
          </div>
        </div>
        <div className={styles.sidebar}>
          <PrizeList currentIndex={currentQuestionIndex} />
        </div>
      </div>
    </main>
  );
}

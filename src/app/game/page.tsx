"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AnswerOption from "@/components/shared/AnswerOption/AnswerOption";
import PrizeList from "@/components/shared/PrizeList/PrizeList";
import { AnswerState } from "@/constants/answerState";
import { ROUTES } from "@/constants/routes";
import useGame from "@/hooks/useGame";

import styles from "./page.module.scss";

export default function GamePage() {
  const router = useRouter();
  const { currentQuestion, currentQuestionIndex, gameStatus, answerQuestion } =
    useGame();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>(
    {}
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className={styles.mobileHeader}>
          <button
            type="button"
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open prize menu"
          >
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              aria-hidden="true"
            >
              <rect width="24" height="2" rx="1" fill="#1C1C21" />
              <rect y="8" width="24" height="2" rx="1" fill="#1C1C21" />
              <rect y="16" width="24" height="2" rx="1" fill="#1C1C21" />
            </svg>
          </button>
        </div>

        <div className={styles.questionArea}>
          <h2 className={styles.question}>{currentQuestion.question}</h2>

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

      {isMenuOpen && (
        <div className={styles.modal}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close prize menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#1C1C21"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <PrizeList currentIndex={currentQuestionIndex} />
        </div>
      )}
    </main>
  );
}

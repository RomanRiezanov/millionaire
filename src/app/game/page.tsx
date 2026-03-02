"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BurgerIcon from "@/assets/icons/BurgerIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
import AnswerOption from "@/components/shared/AnswerOption/AnswerOption";
import PrizeList from "@/components/shared/PrizeList/PrizeList";
import { AnswerState } from "@/constants/answerState";
import GameStatus from "@/constants/gameStatus";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (gameStatus === GameStatus.IDLE) {
      router.replace(ROUTES.HOME);
    }
    if (gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) {
      router.replace(ROUTES.RESULT);
    }
  }, [gameStatus, router]);

  useEffect(() => {
    setSelectedId(null);
    setAnswerStates({});
  }, [currentQuestionIndex]);

  const handleAnswer = (id: string) => {
    if (selectedId !== null) return;

    setSelectedId(id);
    setAnswerStates({ [id]: AnswerState.SELECTED });

    setTimeout(() => {
      if (!currentQuestion) return;

      setAnswerStates(
        Object.fromEntries(
          currentQuestion.answers
            .filter((a) => a.isCorrect || a.id === id)
            .map((a) => [a.id, a.isCorrect ? AnswerState.CORRECT : AnswerState.WRONG])
        )
      );
      answerQuestion([id]);
    }, 1000);
  };

  if (!currentQuestion || gameStatus !== GameStatus.PLAYING) {
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
            <BurgerIcon />
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
                disabled={selectedId !== null}
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
            <CloseIcon />
          </button>

          <PrizeList currentIndex={currentQuestionIndex} />
        </div>
      )}
    </main>
  );
}

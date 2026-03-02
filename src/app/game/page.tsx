"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BurgerIcon } from "@/assets/icons/BurgerIcon";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { AnswerOption } from "@/components/shared/AnswerOption/AnswerOption";
import { PrizeList } from "@/components/shared/PrizeList/PrizeList";
import { GameStatus } from "@/constants/gameStatus";
import { ROUTES } from "@/constants/routes";
import { ANSWER_REVEAL_DELAY, NEXT_QUESTION_DELAY } from "@/constants/timings";
import { getAnswerState } from "@/helpers/getAnswerState";
import { useGame } from "@/hooks/useGame";

import styles from "./page.module.scss";

export default function GamePage() {
  const router = useRouter();
  const { currentQuestion, currentQuestionIndex, gameStatus, answerQuestion } =
    useGame();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    },
    []
  );

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
    setIsRevealed(false);
  }, [currentQuestionIndex]);

  const handleAnswer = (id: string) => {
    if (selectedId !== null) return;

    setSelectedId(id);

    revealTimerRef.current = setTimeout(() => {
      setIsRevealed(true);

      nextTimerRef.current = setTimeout(() => {
        answerQuestion(id);
      }, NEXT_QUESTION_DELAY);
    }, ANSWER_REVEAL_DELAY);
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
                state={getAnswerState(answer, selectedId, isRevealed)}
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

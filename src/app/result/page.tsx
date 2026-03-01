"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Button from "@/components/ui/Button/Button";
import { ROUTES } from "@/constants/routes";
import { formatPrize } from "@/helpers/formatPrize";
import useGameStore from "@/store/gameStore";

import styles from "./page.module.scss";

export default function ResultPage() {
  const router = useRouter();
  const { gameStatus, earnedPrize, resetGame } = useGameStore();

  useEffect(() => {
    if (gameStatus === "idle" || gameStatus === "playing") {
      router.replace(ROUTES.HOME);
    }
  }, [gameStatus, router]);

  const handlePlayAgain = () => {
    resetGame();
    router.push(ROUTES.HOME);
  };

  if (gameStatus === "idle" || gameStatus === "playing") {
    return null;
  }

  const isWon = gameStatus === "won";

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div
          className={classNames(
            styles.icon,
            isWon ? styles.iconWon : styles.iconLost,
          )}
        >
          {isWon ? "🏆" : "😔"}
        </div>

        <h1 className={styles.title}>
          {isWon ? "Congratulations!" : "Game Over"}
        </h1>

        <p className={styles.subtitle}>
          {isWon
            ? "You answered all questions correctly!"
            : "You gave a wrong answer."}
        </p>

        <div className={styles.prizeCard}>
          <p className={styles.prizeLabel}>
            {isWon ? "You won" : "You earned"}
          </p>
          <p className={classNames(styles.prizeAmount, isWon && styles.prizeWon)}>
            <span>{`$${formatPrize(earnedPrize)}`}</span>
          </p>
        </div>

        <Button onClick={handlePlayAgain} fullWidth>
          Play Again
        </Button>
      </div>
    </main>
  );
}

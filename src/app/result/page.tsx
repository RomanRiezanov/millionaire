"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Button from "@/components/ui/Button/Button";
import GameStatus from "@/constants/gameStatus";
import { ROUTES } from "@/constants/routes";
import { formatPrize } from "@/helpers/formatPrize";
import useGameStore from "@/store/gameStore";

import styles from "./page.module.scss";

export default function ResultPage() {
  const router = useRouter();
  const { gameStatus, earnedPrize, resetGame } = useGameStore();

  useEffect(() => {
    if (gameStatus === GameStatus.IDLE || gameStatus === GameStatus.PLAYING) {
      router.replace(ROUTES.HOME);
    }
  }, [gameStatus, router]);

  const handlePlayAgain = () => {
    resetGame();
    router.replace(ROUTES.HOME);
  };

  if (gameStatus === GameStatus.IDLE || gameStatus === GameStatus.PLAYING) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageSection}>
          <Image
            src="/hand.webp"
            alt="hand"
            width={560}
            height={560}
            className={styles.thumb}
            priority
          />
        </div>

        <div className={styles.content}>
          <div className={styles.scoreBlock}>
            <p className={styles.label}>Total score:</p>
            <h1 className={styles.title}>${formatPrize(earnedPrize)} earned</h1>
          </div>

          <Button onClick={handlePlayAgain}>Try again</Button>
        </div>
      </div>
    </main>
  );
}

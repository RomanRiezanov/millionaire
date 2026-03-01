"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button/Button";
import { ROUTES } from "@/constants/routes";
import useGameStore from "@/store/gameStore";

import styles from "./page.module.scss";

export default function StartPage() {
  const router = useRouter();
  const startGame = useGameStore((state) => state.startGame);

  const handleStart = () => {
    startGame();
    router.push(ROUTES.GAME);
  };

  return (
    <main className={styles.page}>
      <div className={styles.imageSection}>
        <Image
          src="/thumb.png"
          alt=""
          width={560}
          height={560}
          className={styles.thumb}
          priority
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Who wants to be a millionaire?</h1>
        <Button onClick={handleStart}>Start</Button>
      </div>
    </main>
  );
}

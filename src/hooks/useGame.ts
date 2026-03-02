import gameConfig from "@/config/questions.json";
import { GameStatus } from "@/constants/gameStatus";
import { useGameStore } from "@/store/gameStore";
import type { Question } from "@/types";

interface UseGameReturn {
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  gameStatus: GameStatus;
  earnedPrize: number;
  startGame: () => void;
  answerQuestion: (answerId: string) => void;
  resetGame: () => void;
}

export const useGame = (): UseGameReturn => {
  const {
    currentQuestionIndex,
    gameStatus,
    earnedPrize,
    startGame,
    answerQuestion,
    resetGame,
  } = useGameStore();

  const currentQuestion =
    gameStatus === GameStatus.PLAYING
      ? gameConfig.questions[currentQuestionIndex] ?? null
      : null;

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: gameConfig.questions.length,
    gameStatus,
    earnedPrize,
    startGame,
    answerQuestion,
    resetGame,
  };
};

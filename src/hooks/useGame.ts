import gameConfig from "@/config/questions.json";
import useGameStore from "@/store/gameStore";
import type { Question } from "@/types";

interface UseGameReturn {
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  gameStatus: string;
  earnedPrize: number;
  startGame: () => void;
  answerQuestion: (answerId: string) => void;
  resetGame: () => void;
}

const useGame = (): UseGameReturn => {
  const {
    currentQuestionIndex,
    gameStatus,
    earnedPrize,
    startGame,
    answerQuestion,
    resetGame,
  } = useGameStore();

  const currentQuestion =
    gameStatus === "playing"
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

export default useGame;

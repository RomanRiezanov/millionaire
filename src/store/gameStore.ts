import { create } from "zustand";

import gameConfig from "@/config/questions.json";
import { GameStatus } from "@/constants/gameStatus";
import type { GameState } from "@/types";

const TOTAL_QUESTIONS = gameConfig.questions.length;

const initialState = {
  currentQuestionIndex: 0,
  gameStatus: GameStatus.IDLE,
  earnedPrize: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  startGame: () => {
    set({ ...initialState, gameStatus: GameStatus.PLAYING });
  },

  answerQuestion: (answerId: string) => {
    const { currentQuestionIndex } = get();
    const question = gameConfig.questions[currentQuestionIndex];

    const isCorrect =
      question.answers.find((a) => a.id === answerId)?.isCorrect ?? false;

    if (!isCorrect) {
      set({ gameStatus: GameStatus.LOST });
      return;
    }

    const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

    if (isLastQuestion) {
      set({ gameStatus: GameStatus.WON, earnedPrize: question.prize });
      return;
    }

    set({
      currentQuestionIndex: currentQuestionIndex + 1,
      earnedPrize: question.prize,
    });
  },

  resetGame: () => {
    set(initialState);
  },
}));

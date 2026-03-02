import { create } from "zustand";

import gameConfig from "@/config/questions.json";
import GameStatus from "@/constants/gameStatus";
import type { GameState } from "@/types";

const TOTAL_QUESTIONS = gameConfig.questions.length;

interface StoreState extends GameState {}

const initialState = {
  currentQuestionIndex: 0,
  gameStatus: GameStatus.IDLE,
  earnedPrize: 0,
};

const useGameStore = create<StoreState>((set, get) => ({
  ...initialState,

  startGame: () => {
    set({ ...initialState, gameStatus: GameStatus.PLAYING });
  },

  answerQuestion: (answerIds: string[]) => {
    const { currentQuestionIndex } = get();
    const question = gameConfig.questions[currentQuestionIndex];

    const correctIds = question.answers
      .filter((a) => a.isCorrect)
      .map((a) => a.id)
      .sort();

    const selectedIds = [...answerIds].sort();
    const isCorrect =
      JSON.stringify(correctIds) === JSON.stringify(selectedIds);

    if (!isCorrect) {
      set({ gameStatus: GameStatus.LOST });
      return;
    }

    const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

    if (isLastQuestion) {
      set({
        gameStatus: GameStatus.WON,
        earnedPrize: question.prize,
      });
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

export default useGameStore;

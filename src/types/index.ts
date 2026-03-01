export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
  prize: number;
}

export interface GameConfig {
  questions: Question[];
}

export type GameStatus = "idle" | "playing" | "won" | "lost";

export interface GameState {
  currentQuestionIndex: number;
  gameStatus: GameStatus;
  earnedPrize: number;
  startGame: () => void;
  answerQuestion: (answerIds: string[]) => void;
  resetGame: () => void;
}

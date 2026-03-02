import { AnswerState } from "@/constants/answerState";
import type { Answer } from "@/types";

export const getAnswerState = (
  answer: Answer,
  selectedId: string | null,
  isRevealed: boolean
): AnswerState => {
  if (!selectedId) {
    return AnswerState.IDLE;
  }

  if (!isRevealed) {
    return answer.id === selectedId ? AnswerState.SELECTED : AnswerState.IDLE;
  }

  if (answer.isCorrect) {
    return AnswerState.CORRECT;
  }

  if (answer.id === selectedId) {
    return AnswerState.WRONG;
  }

  return AnswerState.IDLE;
};

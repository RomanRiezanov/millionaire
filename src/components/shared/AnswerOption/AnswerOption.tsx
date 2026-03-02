import classNames from "classnames";

import { AnswerShapeIcon } from "@/assets/icons/AnswerShapeIcon";
import { AnswerState } from "@/constants/answerState";
import type { Answer } from "@/types";

import styles from "./AnswerOption.module.scss";

interface AnswerOptionProps {
  answer: Answer;
  state?: AnswerState;
  onClick: (id: string) => void;
  disabled?: boolean;
}

export function AnswerOption({
  answer,
  state = AnswerState.IDLE,
  onClick,
  disabled = false,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      className={classNames(styles.option, styles[state])}
      onClick={() => onClick(answer.id)}
      disabled={disabled}
      aria-label={`Answer ${answer.id}: ${answer.text}`}
    >
      <AnswerShapeIcon className={styles.bg} />

      <span className={styles.letter}>{answer.id}</span>

      <span className={styles.text}>{answer.text}</span>
    </button>
  );
}

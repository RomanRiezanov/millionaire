import cn from "classnames";

import { AnswerState } from "@/constants/answerState";
import type { Answer } from "@/types";

import styles from "./AnswerOption.module.scss";

interface AnswerOptionProps {
  answer: Answer;
  state?: AnswerState;
  onClick: (id: string) => void;
  disabled?: boolean;
}

const SHAPE_PATH =
  "M32.0518 0.5H340.948C344.648 0.500069 348.122 2.27998 350.283 5.2832L372.383 36L350.283 66.7168C348.122 69.72 344.648 71.4999 340.948 71.5H32.0518C28.3519 71.4999 24.8777 69.72 22.7168 66.7168L0.616211 36L22.7168 5.2832C24.8777 2.27998 28.3519 0.500067 32.0518 0.5Z";

function AnswerOption({
  answer,
  state = AnswerState.IDLE,
  onClick,
  disabled = false,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      className={cn(styles.option, styles[state])}
      onClick={() => onClick(answer.id)}
      disabled={disabled}
      aria-label={`Answer ${answer.id}: ${answer.text}`}
    >
      <svg
        className={styles.bg}
        viewBox="0 0 373 72"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={SHAPE_PATH} />
      </svg>
      <span className={styles.letter}>{answer.id}</span>
      <span className={styles.text}>{answer.text}</span>
    </button>
  );
}

export default AnswerOption;

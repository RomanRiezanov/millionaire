import classNames from "classnames";

import { PrizeShapeIcon } from "@/assets/icons/PrizeShapeIcon";
import gameConfig from "@/config/questions.json";
import { formatPrize } from "@/helpers/formatPrize";

import styles from "./PrizeList.module.scss";

const prizes = [...gameConfig.questions].reverse();

interface PrizeListProps {
  currentIndex: number;
}

export function PrizeList({ currentIndex }: PrizeListProps) {
  return (
    <aside className={styles.list} aria-label="Prize ladder">
      {prizes.map((question, reversedIdx) => {
        const originalIdx = gameConfig.questions.length - 1 - reversedIdx;
        const isCurrent = originalIdx === currentIndex;
        const isPast = originalIdx < currentIndex;

        return (
          <div
            key={question.id}
            className={classNames(
              styles.item,
              isCurrent && styles.current,
              isPast && styles.past
            )}
            aria-current={isCurrent ? "step" : undefined}
          >
            <PrizeShapeIcon className={styles.bg} />
            <span className={styles.label}>${formatPrize(question.prize)}</span>
          </div>
        );
      })}
    </aside>
  );
}

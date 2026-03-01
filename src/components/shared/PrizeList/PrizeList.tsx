import classNames from "classnames";

import gameConfig from "@/config/questions.json";
import { formatPrize } from "@/helpers/formatPrize";

import styles from "./PrizeList.module.scss";

interface PrizeListProps {
  currentIndex: number;
}

const SHAPE_PATH =
  "M22.2871 0.5H217.713C221.126 0.500018 224.363 2.0158 226.548 4.6377L239.349 20L226.548 35.3623C224.363 37.9842 221.126 39.5 217.713 39.5H22.2871C18.8742 39.5 15.6371 37.9842 13.4521 35.3623L0.650391 20L13.4521 4.6377C15.6371 2.0158 18.8742 0.500017 22.2871 0.5Z";

function PrizeList({ currentIndex }: PrizeListProps) {
  const prizes = [...gameConfig.questions].reverse();

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
            <svg
              className={styles.bg}
              viewBox="0 0 240 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d={SHAPE_PATH} />
            </svg>
            <span className={styles.label}>${formatPrize(question.prize)}</span>
          </div>
        );
      })}
    </aside>
  );
}

export default PrizeList;

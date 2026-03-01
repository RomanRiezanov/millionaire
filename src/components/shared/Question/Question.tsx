import styles from "./Question.module.scss";

interface QuestionProps {
  text: string;
  number: number;
  total: number;
}

function Question({ text, number, total }: QuestionProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.counter}>
        Question {number} / {total}
      </p>
      <h2 className={styles.text}>{text}</h2>
    </div>
  );
}

export default Question;

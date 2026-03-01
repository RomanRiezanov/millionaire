import useGameStore from "../src/store/gameStore";

// Reset store state before each test
beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe("gameStore", () => {
  it("should have idle status initially", () => {
    const { gameStatus } = useGameStore.getState();
    expect(gameStatus).toBe("idle");
  });

  it("startGame sets status to playing and resets index", () => {
    useGameStore.getState().startGame();
    const { gameStatus, currentQuestionIndex } = useGameStore.getState();
    expect(gameStatus).toBe("playing");
    expect(currentQuestionIndex).toBe(0);
  });

  it("correct answer advances to next question", () => {
    useGameStore.getState().startGame();
    // Question 1 correct answer is "C" (Paris)
    useGameStore.getState().answerQuestion(["C"]);
    const { currentQuestionIndex, gameStatus } = useGameStore.getState();
    expect(gameStatus).toBe("playing");
    expect(currentQuestionIndex).toBe(1);
  });

  it("wrong answer sets status to lost", () => {
    useGameStore.getState().startGame();
    // Question 1 correct answer is "C", so "A" is wrong
    useGameStore.getState().answerQuestion(["A"]);
    const { gameStatus } = useGameStore.getState();
    expect(gameStatus).toBe("lost");
  });

  it("wrong answer does not advance question index", () => {
    useGameStore.getState().startGame();
    useGameStore.getState().answerQuestion(["A"]);
    const { currentQuestionIndex } = useGameStore.getState();
    expect(currentQuestionIndex).toBe(0);
  });

  it("correct answer saves earned prize", () => {
    useGameStore.getState().startGame();
    useGameStore.getState().answerQuestion(["C"]);
    const { earnedPrize } = useGameStore.getState();
    expect(earnedPrize).toBe(100);
  });

  it("resetGame restores initial state", () => {
    useGameStore.getState().startGame();
    useGameStore.getState().answerQuestion(["C"]);
    useGameStore.getState().resetGame();
    const { gameStatus, currentQuestionIndex, earnedPrize } =
      useGameStore.getState();
    expect(gameStatus).toBe("idle");
    expect(currentQuestionIndex).toBe(0);
    expect(earnedPrize).toBe(0);
  });
});

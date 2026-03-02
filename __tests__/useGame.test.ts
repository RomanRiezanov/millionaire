import { renderHook } from "@testing-library/react";

import { useGame } from "../src/hooks/useGame";
import { useGameStore } from "../src/store/gameStore";

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe("useGame", () => {
  it("returns null for currentQuestion when status is idle", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.currentQuestion).toBeNull();
  });

  it("returns first question when game is playing", () => {
    useGameStore.getState().startGame();
    const { result } = renderHook(() => useGame());
    expect(result.current.currentQuestion).not.toBeNull();
    expect(result.current.currentQuestion?.id).toBe(1);
  });

  it("returns correct totalQuestions count", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.totalQuestions).toBe(12);
  });

  it("returns idle gameStatus initially", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.gameStatus).toBe("idle");
  });

  it("returns zero earnedPrize initially", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.earnedPrize).toBe(0);
  });

  it("exposes startGame, answerQuestion, resetGame functions", () => {
    const { result } = renderHook(() => useGame());
    expect(typeof result.current.startGame).toBe("function");
    expect(typeof result.current.answerQuestion).toBe("function");
    expect(typeof result.current.resetGame).toBe("function");
  });
});

import { Game } from "@/composables/game";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useGameSettingsStore } from "@/stores/gameSettings";

describe("game", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("initializing and start", () => {
    vi.useFakeTimers();
    const store = useGameSettingsStore();
    const game = new Game(store);

    expect(game.isActive().value).toBeFalsy();

    expect(game.getTimeLeft().value).toBe(store.duration);

    game.start();

    expect(game.isActive().value).toBeTruthy();

    vi.advanceTimersByTime(1000);

    expect(game.getTimeLeft().value).toBe(store.duration - 1);
  });

  test("verify answer", () => {
    const store = useGameSettingsStore();
    const game = new Game(store);

    game.start();

    const problem = game.getCurrentProblem();

    let answer;

    switch (problem.value.operation) {
      case "+":
        answer = problem.value.firstOperand + problem.value.secondOperand;
        break;
      case "x":
        answer = problem.value.firstOperand * problem.value.secondOperand;
        break;
      case "/":
        answer = problem.value.firstOperand / problem.value.secondOperand;
        break;
      case "-":
        answer = problem.value.firstOperand - problem.value.secondOperand;
        break;
    }

    expect(game.verifyAnswer(answer + 1)).toBeFalsy();

    expect(game.getScore().value).toBe(0);

    expect(game.verifyAnswer(answer)).toBeTruthy();

    expect(game.getScore().value).toBe(1);
  });
});

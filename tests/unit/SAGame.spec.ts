import { SAGame } from "@/composables/game";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { solveIntProblem as solveProblem } from "../utils/solveProblem";

describe("game", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("initializing and start", () => {
    vi.useFakeTimers();
    const store = useSAGameSettingsStore();
    const game = new SAGame(store);

    expect(game.isActive()).toBeFalsy();

    expect(game.getTimeLeft().value).toBe(store.duration);

    game.start();

    expect(game.isActive()).toBeTruthy();

    vi.advanceTimersByTime(1000);

    expect(game.getTimeLeft().value).toBe(store.duration - 1);
  });

  test("verify answer", () => {
    const store = useSAGameSettingsStore();
    const game = new SAGame(store);

    game.start();

    const problem = game.getCurrentProblem();

    const answer = solveProblem(problem);

    expect(game.verifyAnswer(answer + 1)).toBeFalsy();

    expect(game.getScore().value).toBe(0);

    expect(game.verifyAnswer(answer)).toBeTruthy();

    expect(game.getScore().value).toBe(1);
  });

  test("restart", () => {
    const store = useSAGameSettingsStore();
    vi.useFakeTimers();
    const game = new SAGame(store);

    game.start();

    let answer;

    for (let i = 0; i < 5; i++) {
      answer = solveProblem(game.getCurrentProblem());
      game.verifyAnswer(answer);
      vi.advanceTimersByTime(1000);
    }

    expect(game.getScore().value).toBe(5);

    expect(game.getTimeLeft().value).toBe(115);

    game.start();

    expect(game.getScore().value).toBe(0);

    expect(game.getTimeLeft().value).toBe(120);

    vi.advanceTimersByTime(2000);

    expect(game.getTimeLeft().value).toBe(118);
  });
});

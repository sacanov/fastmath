import { useFAGameSettingsStore } from "@/stores/FAGameSettings";
import { FAGame } from "@/composables/faGame";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { solveFlashProblem as solveProblem } from "../utils/solveProblem";

test("verify answer", () => {
  setActivePinia(createPinia());
  const store = useFAGameSettingsStore();
  const game = new FAGame(store);

  const solution = solveProblem(game.numbers);

  expect(solution).toEqual(game.solution);
});

describe("Problems generated within range", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("1 digit", () => {
    const store = useFAGameSettingsStore();
    store.numberOfDigits = 1;
    store.numberOfOperands = 1;
    const game = new FAGame(store);

    const problemGenerator = game.getProblemGenerator();
    const numberGeneratorSpy = vi.spyOn(problemGenerator, "generateNumber");
    game.reset();

    expect(numberGeneratorSpy).toHaveBeenCalledWith(
      {
        lowerBound: 1,
        upperBound: 9,
      },
      0
    );
  });
  test("3 digits", () => {
    const store = useFAGameSettingsStore();
    store.numberOfDigits = 3;
    store.numberOfOperands = 1;
    const game = new FAGame(store);

    const problemGenerator = game.getProblemGenerator();
    const numberGeneratorSpy = vi.spyOn(problemGenerator, "generateNumber");
    game.reset();

    expect(numberGeneratorSpy).toHaveBeenCalledWith(
      {
        lowerBound: 101,
        upperBound: 999,
      },
      0
    );
  });
});

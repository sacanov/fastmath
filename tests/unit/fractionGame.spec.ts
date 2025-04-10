import { Fraction } from "@/composables/fraction";
import { FractionGame } from "@/composables/game";
import { useFractionsStore } from "@/stores/FractionsSettings";

import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test } from "vitest";
import { solveFracProblem as solveProblem } from "../utils/solveProblem";

describe("Fraction Game", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("verify answer", () => {
    const store = useFractionsStore();

    const game = new FractionGame(store);

    const problem = game.getCurrentProblem();

    const answer = solveProblem(problem);

    expect(
      game.verifyAnswer(new Fraction(answer.dividend + 1, answer.divisor))
    ).toBeFalsy();

    expect(game.getScore().value).toBe(0);

    expect(game.verifyAnswer(answer)).toBeTruthy();

    expect(game.getScore().value).toBe(1);
  });
});

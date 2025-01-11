import { Fraction } from "@/composables/fraction";
import { FractionGame } from "@/composables/game";
import { useFractionsStore } from "@/stores/FractionsSettings";
import { FractionProblem } from "@/types/problem";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test } from "vitest";
import { Ref } from "vue";

const solveProblem = (problem: Ref<FractionProblem>): Fraction => {
  switch (problem.value.operation) {
    case "+": {
      const solutionDividend =
        problem.value.firstOperand.dividend *
          problem.value.secondOperand.divisor +
        problem.value.firstOperand.divisor *
          problem.value.secondOperand.dividend;

      const solutionDivisor =
        problem.value.firstOperand.divisor *
        problem.value.secondOperand.divisor;
      return new Fraction(solutionDividend, solutionDivisor).toIrreducible();
    }

    case "-": {
      const solutionDividend =
        problem.value.firstOperand.dividend *
          problem.value.secondOperand.divisor -
        problem.value.firstOperand.divisor *
          problem.value.secondOperand.dividend;

      const solutionDivisor =
        problem.value.firstOperand.divisor *
        problem.value.secondOperand.divisor;
      return new Fraction(solutionDividend, solutionDivisor).toIrreducible();
    }
    case "x": {
      const solutionDividend =
        problem.value.firstOperand.dividend *
        problem.value.secondOperand.dividend;

      const solutionDivisor =
        problem.value.firstOperand.divisor *
        problem.value.secondOperand.divisor;
      return new Fraction(solutionDividend, solutionDivisor).toIrreducible();
    }

    case "/": {
      const solutionDividend =
        problem.value.firstOperand.dividend *
        problem.value.secondOperand.divisor;

      const solutionDivisor =
        problem.value.firstOperand.divisor *
        problem.value.secondOperand.dividend;
      return new Fraction(solutionDividend, solutionDivisor).toIrreducible();
    }
  }
};

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

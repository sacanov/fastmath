import { SAProblem } from "@/types/problem";
import { FractionProblem } from "@/types/problem";
import { Ref } from "vue";
import { Fraction } from "@/composables/fraction";

export const solveIntProblem = (problem: Ref<SAProblem>) => {
  switch (problem.value.operation) {
    case "+":
      return problem.value.firstOperand + problem.value.secondOperand;

    case "x":
      return problem.value.firstOperand * problem.value.secondOperand;

    case "/":
      return problem.value.firstOperand / problem.value.secondOperand;

    case "-":
      return problem.value.firstOperand - problem.value.secondOperand;
  }
};

export const solveFracProblem = (problem: Ref<FractionProblem>): Fraction => {
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

export const solveFlashProblem = (numbers: number[]): number => {
  return numbers.reduce((acc, num) => acc + num);
};

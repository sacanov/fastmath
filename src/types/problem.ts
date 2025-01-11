import { Fraction } from "@/composables/fraction";

export type Operation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export interface SAProblem {
  operation: "+" | "x" | "/" | "-";
  firstOperand: number;
  secondOperand: number;
  solution: number;
}

export interface FractionProblem {
  operation: "+" | "x" | "/" | "-";
  firstOperand: Fraction;
  secondOperand: Fraction;
  solution: Fraction;
}

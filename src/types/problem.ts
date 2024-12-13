export type Operation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export interface Problem {
  operation: "+" | "x" | "/" | "-";
  firstOperand: number;
  secondOperand: number;
  solution: number;
}

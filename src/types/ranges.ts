export interface Range {
  lowerBound: number;
  upperBound: number;
}

export interface Ranges {
  firstOperand: Range;
  secondOperand: Range;
}

interface FractionRange {
  dividend: Range;
  divisor: Range;
}

export interface FractionRanges {
  firstOperand: FractionRange;
  secondOperand: FractionRange;
}

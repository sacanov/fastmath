// ToDo

//

import { Range } from "@/types/ranges";
import { PiniaStore } from "@/types/piniaStore";
import {
  Operation,
  SAProblem,
  FractionProblem,
  FAProblem,
} from "@/types/problem";
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { useFractionsStore } from "@/stores/FractionsSettings";
import { Fraction } from "./fraction";
import { useFAGameSettingsStore } from "@/stores/FAGameSettings";

export abstract class ProblemGenerator {
  protected operations: Operation[];
  abstract store: PiniaStore<
    | typeof useSAGameSettingsStore
    | typeof useFractionsStore
    | typeof useFAGameSettingsStore
  >;

  constructor(
    store: PiniaStore<
      | typeof useSAGameSettingsStore
      | typeof useFractionsStore
      | typeof useFAGameSettingsStore
    >
  ) {
    this.operations = [];

    this.createOperationsList(store);
  }

  private createOperationsList = (
    store:
      | PiniaStore<typeof useSAGameSettingsStore>
      | PiniaStore<typeof useFractionsStore>
  ) => {
    if (store.addition) {
      this.operations.push("addition");
    }
    if (store.subtraction) {
      this.operations.push("subtraction");
    }
    if (store.multiplication) {
      this.operations.push("multiplication");
    }
    if (store.division) {
      this.operations.push("division");
    }
  };

  protected generateNumber(range: Range, decimalPlaces: number): number {
    const randomInRange =
      Math.random() * (range.upperBound - range.lowerBound) + range.lowerBound;
    return Number(randomInRange.toFixed(decimalPlaces));
  }

  abstract generateProblem(): SAProblem | FractionProblem | FAProblem;
}

export class SAProblemGenerator extends ProblemGenerator {
  store: PiniaStore<typeof useSAGameSettingsStore>;

  constructor(store: PiniaStore<typeof useSAGameSettingsStore>) {
    super(store);
    this.store = store;
  }

  generateProblem(): SAProblem {
    const operation: Operation =
      this.operations[~~(Math.random() * this.operations.length)];

    switch (operation) {
      case "addition": {
        const firstOperand = this.generateNumber(
          this.store.additionOptions.firstOperand,
          this.store.additionDecimalPlaces
        );

        const secondOperand = this.generateNumber(
          this.store.additionOptions.secondOperand,
          this.store.additionDecimalPlaces
        );

        const solution = firstOperand + secondOperand;

        return {
          operation: "+",
          firstOperand: firstOperand,
          secondOperand: secondOperand,
          solution: Number(solution.toFixed(this.store.additionDecimalPlaces)),
        };
      }
      case "multiplication": {
        const firstOperand = this.generateNumber(
          this.store.multiplicationOptions.firstOperand,
          this.store.multiplicationDecimalPlaces
        );

        const secondOperand = this.generateNumber(
          this.store.multiplicationOptions.secondOperand,
          this.store.multiplicationDecimalPlaces
        );

        const solution = firstOperand * secondOperand;

        return {
          operation: "x",
          firstOperand: firstOperand,
          secondOperand: secondOperand,
          solution: Number(
            solution.toFixed(this.store.multiplicationDecimalPlaces)
          ),
        };
      }

      case "subtraction": {
        if (this.store.sameAsAddition) {
          const firstNumber = this.generateNumber(
            this.store.additionOptions.firstOperand,
            this.store.additionDecimalPlaces
          );
          const secondNumber = this.generateNumber(
            this.store.additionOptions.secondOperand,
            this.store.additionDecimalPlaces
          );

          const result = firstNumber + secondNumber;

          return {
            operation: "-",
            firstOperand: Number(
              result.toFixed(this.store.subtractionDecimalPlaces)
            ),
            secondOperand: secondNumber,
            solution: firstNumber,
          };
        } else {
          const firstNumber = this.generateNumber(
            this.store.subtractionOptions.firstOperand,
            this.store.subtractionDecimalPlaces
          );
          const secondNumber = this.generateNumber(
            this.store.subtractionOptions.secondOperand,
            this.store.subtractionDecimalPlaces
          );

          if (!this.store.negativeResults && secondNumber > firstNumber) {
            return {
              operation: "-",
              firstOperand: secondNumber,
              secondOperand: firstNumber,
              solution: Number(
                (secondNumber - firstNumber).toFixed(
                  this.store.subtractionDecimalPlaces
                )
              ),
            };
          }

          return {
            operation: "-",
            firstOperand: firstNumber,
            secondOperand: secondNumber,
            solution: Number(
              (firstNumber - secondNumber).toFixed(
                this.store.subtractionDecimalPlaces
              )
            ),
          };
        }
      }

      case "division": {
        if (this.store.sameAsMultiplication) {
          let firstNumber;
          if (
            this.store.multiplicationOptions.firstOperand.lowerBound == 0 ||
            this.store.multiplicationOptions.firstOperand.upperBound == 0
          ) {
            const lowerBound =
              this.store.multiplicationOptions.firstOperand.lowerBound == 0
                ? 1
                : this.store.multiplicationOptions.firstOperand.lowerBound;
            const upperBound =
              this.store.multiplicationOptions.firstOperand.upperBound == 0
                ? 1
                : this.store.multiplicationOptions.firstOperand.upperBound;
            firstNumber = this.generateNumber(
              { lowerBound: lowerBound, upperBound: upperBound },
              this.store.multiplicationDecimalPlaces
            );

            console.log(lowerBound, upperBound, firstNumber);
          } else {
            firstNumber = this.generateNumber(
              this.store.multiplicationOptions.firstOperand,
              this.store.multiplicationDecimalPlaces
            );
          }

          const secondNumber = this.generateNumber(
            this.store.multiplicationOptions.secondOperand,
            this.store.multiplicationDecimalPlaces
          );

          const result = firstNumber * secondNumber;

          return {
            operation: "/",
            firstOperand: Number(
              result.toFixed(this.store.divisionDecimalPlaces)
            ),
            secondOperand: firstNumber,
            solution: secondNumber,
          };
        } else {
          const numberOfDecimals1 = this.generateNumber(
            { lowerBound: 0, upperBound: this.store.divisionDecimalPlaces },
            0
          );
          const numberOfDecimals2 =
            this.store.divisionDecimalPlaces - numberOfDecimals1;

          const upperBound1 = Number(
            (
              this.store.divisionOptions.firstOperand.upperBound /
              this.store.divisionOptions.secondOperand.upperBound
            ).toFixed(this.store.divisionDecimalPlaces)
          );
          const lowerBound1 = Number(
            (
              this.store.divisionOptions.firstOperand.lowerBound /
              this.store.divisionOptions.secondOperand.lowerBound
            ).toFixed(this.store.divisionDecimalPlaces)
          );
          const firstNumber = this.generateNumber(
            {
              lowerBound: lowerBound1,
              upperBound: upperBound1,
            },
            numberOfDecimals1
          );

          const upperBound2 = Number(
            (
              this.store.divisionOptions.firstOperand.upperBound / firstNumber
            ).toFixed(this.store.divisionDecimalPlaces)
          );
          const lowerBound2 = Number(
            (
              this.store.divisionOptions.firstOperand.lowerBound / firstNumber
            ).toFixed(this.store.divisionDecimalPlaces)
          );

          const secondNumber = this.generateNumber(
            { lowerBound: lowerBound2, upperBound: upperBound2 },
            numberOfDecimals2
          );

          const result = firstNumber * secondNumber;

          return {
            operation: "/",
            firstOperand: Number(
              result.toFixed(this.store.divisionDecimalPlaces)
            ),
            secondOperand: secondNumber,
            solution: firstNumber,
          };
        }
      }
    }
  }
}

export class FractionProblemGenerator extends ProblemGenerator {
  store: PiniaStore<typeof useFractionsStore>;

  constructor(store: PiniaStore<typeof useFractionsStore>) {
    super(store);
    this.store = store;
  }

  generateProblem(): FractionProblem {
    const operation: Operation =
      this.operations[~~(Math.random() * this.operations.length)];

    switch (operation) {
      case "addition": {
        return this.generateAdditionProblem();
      }
      case "subtraction": {
        if (this.store.sameAsAddition) {
          const problem = this.generateAdditionProblem();
          return {
            operation: "-",
            firstOperand: problem.solution,
            secondOperand: problem.firstOperand,
            solution: problem.secondOperand,
          };
        } else {
          const firstDividend = this.generateNumber(
            this.store.subtractionRanges.firstOperand.dividend,
            0
          );

          const firstDivisor = this.generateNumber(
            this.store.subtractionRanges.firstOperand.divisor,
            0
          );
          const secondDividend = this.generateNumber(
            this.store.subtractionRanges.secondOperand.dividend,
            0
          );
          const secondDivisor = this.generateNumber(
            this.store.subtractionRanges.secondOperand.divisor,
            0
          );

          const solutionDividend =
            firstDividend * secondDivisor - firstDivisor * secondDividend;

          const solutionDivisor = firstDivisor * secondDivisor;

          if (
            !this.store.negativeResults &&
            firstDividend / firstDivisor < secondDividend / secondDivisor
          ) {
            return {
              operation: "-",
              firstOperand: new Fraction(secondDividend, secondDivisor),
              secondOperand: new Fraction(firstDividend, firstDivisor),
              solution: new Fraction(
                -solutionDividend,
                solutionDivisor
              ).toIrreducible(),
            };
          }

          return {
            operation: "-",
            firstOperand: new Fraction(firstDividend, firstDivisor),
            secondOperand: new Fraction(secondDividend, secondDivisor),
            solution: new Fraction(
              solutionDividend,
              solutionDivisor
            ).toIrreducible(),
          };
        }
      }
      case "multiplication": {
        const firstDividend = this.generateNumber(
          this.store.multiplicationRanges.firstOperand.dividend,
          0
        );

        const firstDivisor = this.generateNumber(
          this.store.multiplicationRanges.firstOperand.divisor,
          0
        );
        const secondDividend = this.generateNumber(
          this.store.multiplicationRanges.secondOperand.dividend,
          0
        );
        const secondDivisor = this.generateNumber(
          this.store.multiplicationRanges.secondOperand.divisor,
          0
        );

        const solutionDividend = firstDividend * secondDividend;

        const solutionDivisor = firstDivisor * secondDivisor;

        return {
          operation: "x",
          firstOperand: new Fraction(firstDividend, firstDivisor),
          secondOperand: new Fraction(secondDividend, secondDivisor),
          solution: new Fraction(
            solutionDividend,
            solutionDivisor
          ).toIrreducible(),
        };
      }
      case "division": {
        const firstDividend = this.generateNumber(
          this.store.divisionRanges.firstOperand.dividend,
          0
        );

        const firstDivisor = this.generateNumber(
          this.store.divisionRanges.firstOperand.divisor,
          0
        );
        const secondDividend = this.generateNumber(
          this.store.divisionRanges.secondOperand.dividend,
          0
        );
        const secondDivisor = this.generateNumber(
          this.store.divisionRanges.secondOperand.divisor,
          0
        );

        const solutionDividend = firstDividend * secondDivisor;

        const solutionDivisor = firstDivisor * secondDividend;

        return {
          operation: "/",
          firstOperand: new Fraction(firstDividend, firstDivisor),
          secondOperand: new Fraction(secondDividend, secondDivisor),
          solution: new Fraction(
            solutionDividend,
            solutionDivisor
          ).toIrreducible(),
        };
      }
    }
  }

  private generateAdditionProblem(): FractionProblem {
    const firstDividend = this.generateNumber(
      this.store.additionRanges.firstOperand.dividend,
      0
    );

    const firstDivisor = this.generateNumber(
      this.store.additionRanges.firstOperand.divisor,
      0
    );
    const secondDividend = this.generateNumber(
      this.store.additionRanges.secondOperand.dividend,
      0
    );
    const secondDivisor = this.generateNumber(
      this.store.additionRanges.secondOperand.divisor,
      0
    );

    const solutionDividend =
      firstDividend * secondDivisor + firstDivisor * secondDividend;

    const solutionDivisor = firstDivisor * secondDivisor;

    return {
      operation: "+",
      firstOperand: new Fraction(firstDividend, firstDivisor),
      secondOperand: new Fraction(secondDividend, secondDivisor),
      solution: new Fraction(solutionDividend, solutionDivisor).toIrreducible(),
    };
  }
}

export class FAProblemGenerator extends ProblemGenerator {
  store: PiniaStore<typeof useFAGameSettingsStore>;

  constructor(store: PiniaStore<typeof useFAGameSettingsStore>) {
    super(store);
    this.store = store;
  }

  generateProblem(): FAProblem {
    const numbers = [];

    for (let i = 0; i < this.store.numberOfOperands; i++) {
      numbers.push(
        this.generateNumber(
          {
            lowerBound: 1 + 10 ** (this.store.numberOfDigits - 1),
            upperBound: this.store.numberOfDigits * 10 - 1,
          },
          0
        )
      );
    }
    return {
      digits: numbers,
      solution: numbers.reduce((x, y) => x + y),
    };
  }
}

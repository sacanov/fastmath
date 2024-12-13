// ToDo

// create with answers, use OperatorOptions (in reverse, decimal places)

import { Range } from "@/types/ranges";
import { PiniaStore } from "@/types/piniaStore";
import { Operation, Problem } from "@/types/problem";
import { useGameSettingsStore } from "@/stores/gameSettings";

export class ProblemGenerator {
  private operations: Operation[];
  private store: PiniaStore<typeof useGameSettingsStore>;

  constructor(store: PiniaStore<typeof useGameSettingsStore>) {
    this.operations = [];
    this.store = store;
    this.createOperationsList();
  }

  private createOperationsList = () => {
    if (this.store.addition) {
      this.operations.push("addition");
    }
    if (this.store.subtraction) {
      this.operations.push("subtraction");
    }
    if (this.store.multiplication) {
      this.operations.push("multiplication");
    }
    if (this.store.division) {
      this.operations.push("division");
    }
  };

  generateProblem(): Problem {
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

        return {
          operation: "+",
          firstOperand: firstOperand,
          secondOperand: secondOperand,
          solution: firstOperand + secondOperand,
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

        return {
          operation: "x",
          firstOperand: firstOperand,
          secondOperand: secondOperand,
          solution: firstOperand * secondOperand,
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
            firstOperand: result,
            secondOperand: secondNumber,
            solution: firstNumber,
          };
        } else {
          const firstNumber = this.generateNumber(
            {
              upperBound:
                this.store.subtractionOptions.firstOperand.upperBound -
                this.store.subtractionOptions.secondOperand.upperBound,
              lowerBound: this.store.subtractionOptions.firstOperand.lowerBound,
            },
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
              solution: secondNumber - firstNumber,
            };
          }

          return {
            operation: "-",
            firstOperand: firstNumber,
            secondOperand: secondNumber,
            solution: firstNumber - secondNumber,
          };
        }
      }

      case "division": {
        if (this.store.sameAsMultiplication) {
          const firstNumber = this.generateNumber(
            this.store.multiplicationOptions.firstOperand,
            this.store.multiplicationDecimalPlaces
          );
          const secondNumber = this.generateNumber(
            this.store.multiplicationOptions.secondOperand,
            this.store.multiplicationDecimalPlaces
          );

          const result = firstNumber * secondNumber;

          return {
            operation: "/",
            firstOperand: result,
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

          const upperBound = Number(
            (
              this.store.divisionOptions.firstOperand.upperBound /
              this.store.divisionOptions.secondOperand.lowerBound
            ).toFixed(this.store.divisionDecimalPlaces)
          );
          const lowerBound = Number(
            (
              this.store.divisionOptions.firstOperand.lowerBound /
              this.store.divisionOptions.secondOperand.upperBound
            ).toFixed(this.store.divisionDecimalPlaces)
          );
          const firstNumber = this.generateNumber(
            {
              lowerBound: lowerBound,
              upperBound: upperBound,
            },
            numberOfDecimals1
          );

          const secondNumber = this.generateNumber(
            this.store.divisionOptions.secondOperand,
            numberOfDecimals2
          );

          const result = firstNumber * secondNumber;

          return {
            operation: "/",
            firstOperand: result,
            secondOperand: firstNumber,
            solution: secondNumber,
          };
        }
      }
    }
  }

  private generateNumber(range: Range, decimalPlaces: number): number {
    const randomInRange =
      Math.random() * (range.upperBound - range.lowerBound) + range.lowerBound;
    return Number(randomInRange.toFixed(decimalPlaces));
  }
}

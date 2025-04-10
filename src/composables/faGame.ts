import { useFAGameSettingsStore } from "@/stores/FAGameSettings";
import { PiniaStore } from "@/types/piniaStore";
import { FAProblem } from "@/types/problem";
import { Ref, ref } from "vue";
import { FAProblemGenerator } from "./problemGenerator";

export class FAGame {
  private store: PiniaStore<typeof useFAGameSettingsStore>;
  private problem: Ref<FAProblem>;
  private problemGenerator: FAProblemGenerator;
  private numberFlasher: flashProblemDisplayer;
  private score?: number;

  constructor(store: PiniaStore<typeof useFAGameSettingsStore>) {
    this.problemGenerator = new FAProblemGenerator(store);
    this.store = store;
    this.problem = ref(this.problemGenerator.generateProblem());
    this.numberFlasher = new flashProblemDisplayer(
      this.problem,
      store.timePerNumber
    );
  }

  reset() {
    this.problem.value = this.problemGenerator.generateProblem();
    this.numberFlasher.reset();
  }

  flashNumbers() {
    this.numberFlasher.flashNumbers();
    return this.numberFlasher.currentNumber;
  }

  flashingFinished() {
    return this.numberFlasher.finished;
  }

  verifyAnswer(solution: number): void {
    if (solution !== Number(this.problem.value.solution)) {
      this.score = 0;
    } else {
      const t = this.store.timePerNumber;
      const m = this.store.numberOfDigits;
      const n = this.store.numberOfOperands;

      const score = (1 / t ** 2) * n * m * 2 ** (m - 1);
      this.score = Number(score.toFixed(2));
    }
  }

  getScore = () => {
    return this.score;
  };

  getProblemGenerator = () => {
    return this.problemGenerator;
  };

  get numbers() {
    return this.problem.value.digits;
  }

  get solution() {
    return this.problem.value.solution;
  }
}

class flashProblemDisplayer {
  private timeout?: NodeJS.Timeout;
  private problem: Ref<FAProblem>;
  currentNumber: Ref<number | undefined>;
  private stepDuration: number;
  private _finished: Ref<boolean>;

  constructor(problem: Ref<FAProblem>, stepDuration: number) {
    this.problem = problem;
    this.currentNumber = ref(undefined);
    this.stepDuration = stepDuration;
    this._finished = ref(false);
  }

  reset() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this._finished.value = false;
  }

  flashNumbers() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.finished.value = false;
    this.step(0);
  }

  private step(i: number) {
    this.timeout = setTimeout(() => {
      if (i < this.problem.value.digits.length) {
        this.currentNumber.value = this.problem.value.digits[i];
        this.timeout = setTimeout(() => {
          this.currentNumber.value = undefined;
          this.step(i + 1);
        }, 1000 * this.stepDuration);
      } else {
        this.finished.value = true;
      }
    }, 50);
  }

  get finished() {
    return this._finished;
  }
}

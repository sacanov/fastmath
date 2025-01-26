// ToDo

// verifyAnswer, gameState, finishGame

// backbutton restart

import { Timer } from "./timer";
import {
  FractionProblemGenerator,
  SAProblemGenerator,
} from "./problemGenerator";
import { PiniaStore } from "@/types/piniaStore";
import { SAProblem, FractionProblem } from "@/types/problem";
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { ref, Ref, watch } from "vue";
import { useFractionsStore } from "@/stores/FractionsSettings";
import { Fraction } from "./fraction";

export abstract class Game {
  protected timer: Timer;
  abstract problemGenerator: SAProblemGenerator | FractionProblemGenerator;
  abstract currentProblem: Ref<SAProblem> | Ref<FractionProblem>;
  protected active: Ref<boolean>;
  protected score: Ref<number>;

  abstract verifyAnswer(answer: number | Fraction): boolean;

  constructor(
    store: PiniaStore<typeof useSAGameSettingsStore | typeof useFractionsStore>
  ) {
    this.timer = new Timer(store.duration);
    this.active = ref(false);
    this.score = ref(0);
    watch(this.timer.getTime(), (newValue) => {
      if (newValue == 0) {
        this.active.value = false;
      }
    });
  }
  start() {
    if (this.timer.getStartingTime()) {
      this.currentProblem.value = this.problemGenerator.generateProblem();
      this.score.value = 0;
      this.timer.restart();
    } else {
      this.timer.start();
    }
    this.active.value = true;
  }

  isActive(): boolean {
    return this.active.value;
  }

  getTimeLeft(): Ref<number> {
    return this.timer.getTime();
  }

  getScore(): Ref<number> {
    return this.score;
  }

  abstract getCurrentProblem(): Ref<SAProblem> | Ref<FractionProblem>;
}

export class SAGame extends Game {
  problemGenerator: SAProblemGenerator;
  currentProblem: Ref<SAProblem>;

  constructor(store: PiniaStore<typeof useSAGameSettingsStore>) {
    super(store);
    this.problemGenerator = new SAProblemGenerator(store);
    this.currentProblem = ref(this.problemGenerator.generateProblem());
  }

  verifyAnswer(answer: number) {
    if (this.active.value && answer == this.currentProblem.value.solution) {
      this.currentProblem.value = this.problemGenerator.generateProblem();
      this.score.value++;

      return true;
    } else {
      return false;
    }
  }

  getCurrentProblem(): Ref<SAProblem> {
    return this.currentProblem;
  }
}

export class FractionGame extends Game {
  problemGenerator: FractionProblemGenerator;
  currentProblem: Ref<FractionProblem>;

  constructor(store: PiniaStore<typeof useFractionsStore>) {
    super(store);
    this.problemGenerator = new FractionProblemGenerator(store);
    this.currentProblem = ref(this.problemGenerator.generateProblem());
  }

  verifyAnswer(answer: Fraction): boolean {
    const solution = this.currentProblem.value.solution;
    if (
      answer.dividend === solution.dividend &&
      answer.divisor === solution.divisor
    ) {
      this.score.value++;
      this.currentProblem.value = this.problemGenerator.generateProblem();
      return true;
    } else {
      return false;
    }
  }

  getCurrentProblem(): Ref<FractionProblem> {
    return this.currentProblem;
  }
}

// ToDo

// verifyAnswer, gameState, finishGame

// backbutton restart

import { Timer } from "./timer";
import { ProblemGenerator } from "./problemGenerator";
import { PiniaStore } from "@/types/piniaStore";
import { Problem } from "@/types/problem";
import { useGameSettingsStore } from "@/stores/gameSettings";
import { ref, Ref, watch } from "vue";

export class Game {
  // private store: { [key: string]: any };
  private timer: Timer;
  private problemGenerator: ProblemGenerator;
  private currentProblem: Ref<Problem>;
  private active: Ref<boolean>;
  private score: Ref<number>;

  constructor(store: PiniaStore<typeof useGameSettingsStore>) {
    // this.store = store;
    this.timer = new Timer(store.duration);
    this.problemGenerator = new ProblemGenerator(store);
    this.currentProblem = ref(this.problemGenerator.generateProblem());
    this.active = ref(false);
    this.score = ref(0);
    watch(this.timer.getTime(), (newValue) => {
      if (newValue == 0) {
        this.active.value = false;
      }
    });
  }
  start() {
    if (!this.active.value) {
      this.timer.start();
      this.active.value = true;
      // this.currentProblem.value = this.problemGenerator.generateProblem();
    }
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

  isActive(): Ref<boolean> {
    return this.active;
  }

  getTimeLeft(): Ref<number> {
    return this.timer.getTime();
  }

  getScore(): Ref<number> {
    return this.score;
  }

  getCurrentProblem(): Ref<Problem> {
    return this.currentProblem;
  }
}

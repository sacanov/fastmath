import { Ref, ref } from "vue";

export class Timer {
  private duration: number;
  private timeLeft: Ref<number>;
  private startingTime?: number;
  private timeout?: NodeJS.Timeout;

  constructor(duration: number) {
    this.duration = duration;
    this.timeLeft = ref(duration);
  }

  start() {
    this.timeLeft.value = this.duration;
    this.startingTime = Date.now();
    this.timeout = setTimeout(() => this.update(1), 1000);
  }

  restart() {
    clearTimeout(this.timeout);
    this.start();
  }

  private update = (timePassed: number) => {
    if (this.startingTime) {
      const expectedTime = this.startingTime + timePassed * 1000;
      const actualTime = Date.now();
      const error = expectedTime - actualTime;
      if (this.timeLeft.value > 0) {
        this.timeLeft.value--;
        this.timeout = setTimeout(
          () => this.update(timePassed + 1),
          1000 + error
        );
      }
    }
  };

  getTime() {
    return this.timeLeft;
  }
  getStartingTime() {
    return this.startingTime;
  }
  getDuration() {
    return this.duration;
  }
}

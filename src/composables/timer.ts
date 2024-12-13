import { Ref, ref } from "vue";

export class Timer {
  private duration: number;
  private timeLeft: Ref<number>;
  private startingTime!: number;

  constructor(duration: number) {
    this.duration = duration;
    this.timeLeft = ref(duration);
  }

  start() {
    this.startingTime = Date.now();
    setTimeout(() => this.update(1), 1000);
  }

  restart() {
    this.timeLeft.value = this.duration;
    this.start();
  }

  private update = (timePassed: number) => {
    const expectedTime = this.startingTime + timePassed * 1000;
    const actualTime = Date.now();
    const error = expectedTime - actualTime;
    if (timePassed <= this.duration) {
      this.timeLeft.value--;
      setTimeout(() => this.update(timePassed + 1), 1000 + error);
    }
  };

  getTime() {
    return this.timeLeft;
  }
}

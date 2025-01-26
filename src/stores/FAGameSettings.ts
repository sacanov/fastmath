import { defineStore } from "pinia";
import { ref } from "vue";

export const useFAGameSettingsStore = defineStore("SASettings", () => {
  const numberOfDigits = ref(1);
  const timePerNumber = ref(1);
  const numberOfOperands = ref(10);

  const playing = ref(false);

  const $reset = () => {
    numberOfDigits.value = 1;
    timePerNumber.value = 1;
    numberOfOperands.value = 10;

    playing.value = false;
  };

  return {
    numberOfDigits,
    timePerNumber,
    numberOfOperands,
    playing,
    $reset,
  };
});

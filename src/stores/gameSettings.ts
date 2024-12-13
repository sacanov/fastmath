import { ref, reactive } from "vue";
import { defineStore } from "pinia";

export const useGameSettingsStore = defineStore("gameSettings", () => {
  const addition = ref(true);
  const additionOptions = ref({
    firstOperand: {
      lowerBound: 2,
      upperBound: 99,
    },
    secondOperand: {
      lowerBound: 2,
      upperBound: 99,
    },
  });

  const additionDecimalPlaces = ref(0);

  const additionReset = () => {
    addition.value = true;
    additionOptions.value.firstOperand = {
      lowerBound: 2,
      upperBound: 99,
    };
    additionOptions.value.secondOperand = {
      lowerBound: 2,
      upperBound: 99,
    };

    additionDecimalPlaces.value = 0;
  };

  const subtraction = ref(true);
  const sameAsAddition = ref(true);
  const subtractionOptions = ref({
    firstOperand: {
      lowerBound: 2,
      upperBound: 198,
    },
    secondOperand: {
      lowerBound: 2,
      upperBound: 12,
    },
  });

  const negativeResults = ref(false);

  const subtractionDecimalPlaces = ref(0);

  const subtractionReset = () => {
    subtraction.value = true;
    subtractionOptions.value.firstOperand = {
      lowerBound: 2,
      upperBound: 198,
    };
    subtractionOptions.value.secondOperand = {
      lowerBound: 2,
      upperBound: 12,
    };
    negativeResults.value = false;

    subtractionDecimalPlaces.value = 0;
  };

  const multiplication = ref(true);

  const multiplicationOptions = ref({
    firstOperand: {
      lowerBound: 2,
      upperBound: 12,
    },
    secondOperand: {
      lowerBound: 2,
      upperBound: 99,
    },
  });

  const multiplicationDecimalPlaces = ref(0);

  const multiplicationReset = () => {
    multiplication.value = true;
    multiplicationOptions.value.firstOperand = {
      lowerBound: 2,
      upperBound: 12,
    };
    multiplicationOptions.value.secondOperand = {
      lowerBound: 2,
      upperBound: 99,
    };

    multiplicationDecimalPlaces.value = 0;
  };

  const division = ref(true);

  const sameAsMultiplication = ref(true);

  const divisionOptions = ref({
    firstOperand: {
      lowerBound: 4,
      upperBound: 1188,
    },
    secondOperand: {
      lowerBound: 2,
      upperBound: 12,
    },
  });

  const divisionDecimalPlaces = ref(0);

  const divisionReset = () => {
    division.value = true;
    divisionOptions.value.firstOperand = {
      lowerBound: 4,
      upperBound: 1188,
    };
    divisionOptions.value.secondOperand = {
      lowerBound: 2,
      upperBound: 12,
    };

    divisionDecimalPlaces.value = 0;
  };

  const duration = ref(120);

  const playing = ref(false);

  const $reset = () => {
    additionReset();
    subtractionReset();
    multiplicationReset();
    divisionReset();
    sameAsAddition.value = true;
    sameAsMultiplication.value = true;
    playing.value = true;
  };

  return {
    addition,
    additionOptions,
    additionDecimalPlaces,
    additionReset,
    subtraction,
    sameAsAddition,
    subtractionOptions,
    negativeResults,
    subtractionDecimalPlaces,
    subtractionReset,
    multiplication,
    multiplicationOptions,
    multiplicationDecimalPlaces,
    multiplicationReset,
    division,
    sameAsMultiplication,
    divisionOptions,
    divisionDecimalPlaces,
    divisionReset,
    duration,
    playing,
    $reset,
  };
});

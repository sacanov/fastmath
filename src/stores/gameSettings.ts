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

  const decimalPlacesAdd = ref(0);

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

    decimalPlacesAdd.value = 0;
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

  const decimalPlacesSub = ref(0);

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

    decimalPlacesSub.value = 0;
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

  const decimalPlacesMult = ref(0);

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

    decimalPlacesMult.value = 0;
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

  const decimalPlacesDiv = ref(0);

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

    decimalPlacesDiv.value = 0;
  };

  const duration = ref(120);

  const $reset = () => {
    additionReset();
    subtractionReset();
    multiplicationReset();
    divisionReset();
    sameAsAddition.value = true;
    sameAsMultiplication.value = true;
  };

  return {
    addition,
    additionOptions,
    decimalPlacesAdd,
    additionReset,
    subtraction,
    sameAsAddition,
    subtractionOptions,
    negativeResults,
    decimalPlacesSub,
    subtractionReset,
    multiplication,
    multiplicationOptions,
    decimalPlacesMult,
    multiplicationReset,
    division,
    sameAsMultiplication,
    divisionOptions,
    decimalPlacesDiv,
    divisionReset,
    duration,
    $reset,
  };
});

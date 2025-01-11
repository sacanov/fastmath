import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { FractionRanges } from "@/types/ranges";

export const useFractionsStore = defineStore("fractionsSettings", () => {
  const addition = ref(true);

  const additionRanges: Ref<FractionRanges> = ref({
    firstOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
    secondOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
  });

  const additionReset = () => {
    addition.value = true;
    additionRanges.value.firstOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };
    additionRanges.value.secondOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };
  };

  const subtraction = ref(true);

  const subtractionRanges: Ref<FractionRanges> = ref({
    firstOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
    secondOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
  });

  const negativeResults = ref(false);

  const sameAsAddition = ref(true);

  const subtractionReset = () => {
    subtraction.value = true;
    subtractionRanges.value.firstOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };
    subtractionRanges.value.secondOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };

    negativeResults.value = false;

    sameAsAddition.value = true;
  };

  const multiplication = ref(true);

  const multiplicationRanges: Ref<FractionRanges> = ref({
    firstOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
    secondOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
  });

  const multiplicationReset = () => {
    multiplication.value = true;

    multiplicationRanges.value.firstOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };

    multiplicationRanges.value.secondOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 12,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };
  };

  const division = ref(true);

  const divisionRanges: Ref<FractionRanges> = ref({
    firstOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 99,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
    secondOperand: {
      dividend: {
        lowerBound: 2,
        upperBound: 99,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    },
  });

  const divisionReset = () => {
    division.value = true;

    divisionRanges.value.firstOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 99,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };

    divisionRanges.value.secondOperand = {
      dividend: {
        lowerBound: 2,
        upperBound: 99,
      },
      divisor: {
        lowerBound: 2,
        upperBound: 12,
      },
    };
  };

  const duration = ref(120);

  const playing = ref(false);

  const $reset = () => {
    additionReset();
    subtractionReset();
    multiplicationReset();
    divisionReset();
    duration.value = 120;
    playing.value = false;
  };

  return {
    addition,
    additionRanges,
    additionReset,
    subtraction,
    subtractionRanges,
    negativeResults,
    sameAsAddition,
    subtractionReset,
    multiplication,
    multiplicationRanges,
    multiplicationReset,
    division,
    divisionRanges,
    divisionReset,
    duration,
    playing,
    $reset,
  };
});

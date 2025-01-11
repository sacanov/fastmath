<script setup lang="ts">
import FractionEl from "./FractionEl.vue";

import { IonInput } from "@ionic/vue";

import { FractionRanges } from "@/types/ranges";
import { reactive, ref } from "vue";

const props = defineProps<{
  symbol: string;
  ranges: FractionRanges;
  disabled?: boolean;
}>();

const dividendLower1 = ref();
const dividendUpper1 = ref();
const divisorLower1 = ref();
const divisorUpper1 = ref();

const dividendLower2 = ref();
const dividendUpper2 = ref();
const divisorLower2 = ref();
const divisorUpper2 = ref();

const ranges = reactive(props.ranges);

const filter = (value: string, src: string) => {
  if (value) {
    const filtered = value.replace(/[^0-9]+/g, "");

    if (src === "dividendL1") {
      dividendLower1.value.$el.value = filtered;
      ranges.firstOperand.dividend.lowerBound = Number(filtered);
    } else if (src === "dividendU1") {
      dividendUpper1.value.$el.value = filtered;
      ranges.firstOperand.dividend.upperBound = Number(filtered);
    } else if (src === "divisorL1") {
      divisorLower1.value.$el.value = filtered;
      ranges.firstOperand.divisor.lowerBound = Number(filtered);
    } else if (src === "divisorU1") {
      divisorUpper1.value.$el.value = filtered;
      ranges.firstOperand.divisor.upperBound = Number(filtered);
    } else if (src === "dividendL2") {
      dividendLower2.value.$el.value = filtered;
      ranges.secondOperand.dividend.lowerBound = Number(filtered);
    } else if (src === "dividendU2") {
      dividendUpper2.value.$el.value = filtered;
      ranges.secondOperand.dividend.upperBound = Number(filtered);
    } else if (src === "divisorL2") {
      divisorLower2.value.$el.value = filtered;
      ranges.secondOperand.divisor.lowerBound = Number(filtered);
    } else if (src === "divisorU2") {
      divisorUpper2.value.$el.value = filtered;
      ranges.secondOperand.divisor.upperBound = Number(filtered);
    }
  }
};
</script>

<template>
  <div class="fraction-ranges" :class="{ disabled: disabled }">
    <fraction-el :width="8.5">
      <template #dividend>
        <ion-input
          :maxlength="6"
          v-model="ranges.firstOperand.dividend.lowerBound"
          :disabled="disabled"
          ref="dividendLower1"
          @ion-input="filter(String($event.target.value), 'dividendL1')"
        ></ion-input>
        to
        <ion-input
          :maxlength="6"
          v-model="ranges.firstOperand.dividend.upperBound"
          :disabled="disabled"
          ref="dividendUpper1"
          @ion-input="filter(String($event.target.value), 'dividendU1')"
        ></ion-input>
      </template>
      <template #divisor
        ><ion-input
          :maxlength="6"
          v-model="ranges.firstOperand.divisor.lowerBound"
          :disabled="disabled"
          ref="divisorLower1"
          @ion-input="filter(String($event.target.value), 'divisorL1')"
        ></ion-input>
        to
        <ion-input
          :maxlength="6"
          v-model="ranges.firstOperand.divisor.upperBound"
          :disabled="disabled"
          ref="divisorUpper1"
          @ion-input="filter(String($event.target.value), 'divisorU1')"
        ></ion-input
      ></template>
    </fraction-el>
    {{ props.symbol }}
    <fraction-el :width="8.5">
      <template #dividend>
        <ion-input
          :maxlength="6"
          v-model="ranges.secondOperand.dividend.lowerBound"
          :disabled="disabled"
          ref="dividendLower2"
          @ion-input="filter(String($event.target.value), 'dividendL2')"
        ></ion-input>
        to
        <ion-input
          :maxlength="6"
          v-model="ranges.secondOperand.dividend.upperBound"
          :disabled="disabled"
          ref="dividendUpper2"
          @ion-input="filter(String($event.target.value), 'dividendU2')"
        ></ion-input>
      </template>
      <template #divisor
        ><ion-input
          :maxlength="6"
          v-model="ranges.secondOperand.divisor.lowerBound"
          :disabled="disabled"
          ref="divisorLower2"
          @ion-input="filter(String($event.target.value), 'divisorL2')"
        ></ion-input>
        to
        <ion-input
          :maxlength="6"
          v-model="ranges.secondOperand.divisor.upperBound"
          :disabled="disabled"
          ref="divisorUpper2"
          @ion-input="filter(String($event.target.value), 'divisorU2')"
        ></ion-input
      ></template>
    </fraction-el>
  </div>
</template>

<style scoped>
.fraction-ranges {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
ion-input {
  max-width: 6ch !important;
  text-align: center !important;
  --background: var(--secondary-container-variant);
}

@media screen and (max-width: 500px) {
  .fraction-ranges {
    flex-direction: column;
  }
}
</style>

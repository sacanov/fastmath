<script setup lang="ts">
import { IonInput } from "@ionic/vue";
import { reactive, ref } from "vue";
import Ranges from "@/types/ranges";

const props = defineProps<{
  symbol: string;
  ranges: Ranges;
  disabled?: boolean;
}>();

const ranges = reactive(props.ranges);

const firstLower = ref();
const firstUpper = ref();
const secondLower = ref();
const secondUpper = ref();

const filter = (ev, arg: string) => {
  const filtered = ev.target.value.replace(/[^0-9]+/g, "");

  if (arg == "firstLower" && firstLower) {
    firstLower.value.$el.value = filtered;
    ranges.firstOperand.lowerBound = filtered;
  } else if (arg == "firstUpper" && firstUpper) {
    firstUpper.value.$el.value = filtered;
    ranges.firstOperand.upperBound = filtered;
  } else if (arg == "secondLower" && secondLower) {
    secondLower.value.$el.value = filtered;
    ranges.secondOperand.lowerBound = filtered;
  } else if (arg == "secondUpper" && secondLower) {
    secondUpper.value.$el.value = filtered;
    ranges.secondOperand.upperBound = filtered;
  }
};
</script>

<template>
  <strong :class="{ disabled: disabled }">Range:</strong>
  <div class="ranges" :class="{ disabled: disabled }">
    <div class="inline">
      (<IonInput
        :maxlength="8"
        ref="firstLower"
        @ion-input="filter($event, 'firstLower')"
        v-model="ranges.firstOperand.lowerBound"
        :disabled="disabled"
        inputmode="numeric"
        data-testid="ranges-input"
      ></IonInput>
      to
      <IonInput
        :maxlength="8"
        ref="firstUpper"
        @ion-input="filter($event, 'firstUpper')"
        v-model="ranges.firstOperand.upperBound"
        :disabled="disabled"
        inputmode="numeric"
        data-testid="ranges-input"
      ></IonInput
      >)
    </div>

    <p style="margin: auto 1ch">{{ props.symbol }}</p>

    <div class="inline">
      (<IonInput
        :maxlength="8"
        ref="secondLower"
        @ion-input="filter($event, 'secondLower')"
        v-model="ranges.secondOperand.lowerBound"
        :disabled="disabled"
        inputmode="numeric"
        data-testid="ranges-input"
      ></IonInput>
      to
      <IonInput
        :maxlength="8"
        ref="secondUpper"
        @ion-input="filter($event, 'secondUpper')"
        v-model="ranges.secondOperand.upperBound"
        :disabled="disabled"
        inputmode="numeric"
        data-testid="ranges-input"
      ></IonInput
      >)
    </div>
  </div>
</template>

<style scoped>
.disabled {
  opacity: 0.3;
}
.inline {
  display: flex;
  align-items: center;
}
.ranges {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
}
ion-input {
  max-width: 8ch !important;
  text-align: center !important;
  --background: var(--secondary-container-variant);
}
</style>

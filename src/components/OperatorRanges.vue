<script setup lang="ts">
import { IonInput } from "@ionic/vue";
import { reactive, ref } from "vue";
import { Ranges } from "@/types/ranges";

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

const filter = (ev: string | undefined | null, src: string) => {
  if (ev) {
    const filtered = ev.replace(/[^0-9]+/g, "");

    if (src === "firstLower" && firstLower) {
      firstLower.value.$el.value = filtered;
      ranges.firstOperand.lowerBound = Number(filtered);
    } else if (src === "firstUpper" && firstUpper) {
      firstUpper.value.$el.value = filtered;
      ranges.firstOperand.upperBound = Number(filtered);
    } else if (src === "secondLower" && secondLower) {
      secondLower.value.$el.value = filtered;
      ranges.secondOperand.lowerBound = Number(filtered);
    } else if (src === "secondUpper" && secondLower) {
      secondUpper.value.$el.value = filtered;
      ranges.secondOperand.upperBound = Number(filtered);
    }
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
        @ion-input="filter(String($event.target.value), 'firstLower')"
        v-model="ranges.firstOperand.lowerBound"
        :disabled="disabled"
        inputmode="numeric"
        data-testid="ranges-input"
      ></IonInput>
      to
      <IonInput
        :maxlength="8"
        ref="firstUpper"
        @ion-input="filter(String($event.target.value), 'firstUpper')"
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
        @ion-input="filter(String($event.target.value), 'secondLower')"
        v-model="ranges.secondOperand.lowerBound"
        :disabled="disabled"
        inputmode="numeric"
        data-testid="ranges-input"
      ></IonInput>
      to
      <IonInput
        :maxlength="8"
        ref="secondUpper"
        @ion-input="filter(String($event.target.value), 'secondUpper')"
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

<!-- ToDo
if empty take as default, take highest as highest

visual testing?

fractions gamemode? dino clone, climb rope

tests-->

<script setup lang="ts">
import { useGameSettingsStore } from "@/stores/gameSettings";
import { storeToRefs } from "pinia";
import OperatorOptions from "@/components/OperatorOptions.vue";
import OperatorRanges from "@/components/OperatorRanges.vue";

import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  IonToast,
} from "@ionic/vue";
import { ref } from "vue";

const store = useGameSettingsStore();

const {
  addition,
  additionOptions,
  decimalPlacesAdd,
  subtraction,
  sameAsAddition,
  subtractionOptions,
  negativeResults,
  decimalPlacesSub,
  multiplication,
  multiplicationOptions,
  decimalPlacesMult,
  division,
  sameAsMultiplication,
  divisionOptions,
  decimalPlacesDiv,
  duration,
} = storeToRefs(store);

const additionDecimalsInput = ref();
const subtractionDecimalsInput = ref();
const multiplicationDecimalsInput = ref();
const divisionDecimalsInput = ref();
const durationInput = ref();

const filter = (ev, arg: string) => {
  const filtered = ev.target.value.replace(/[^0-9]+/g, "");

  if (arg == "addition" && additionDecimalsInput != undefined) {
    additionDecimalsInput.value.$el.value = filtered;
    decimalPlacesAdd.value = filtered;
  } else if (arg == "subtraction" && subtractionDecimalsInput != undefined) {
    subtractionDecimalsInput.value.$el.value = filtered;
    decimalPlacesSub.value = filtered;
  } else if (
    arg == "multiplication" &&
    multiplicationDecimalsInput != undefined
  ) {
    multiplicationDecimalsInput.value.$el.value = filtered;
    decimalPlacesMult.value = filtered;
  } else if (arg == "division" && divisionDecimalsInput != undefined) {
    divisionDecimalsInput.value.$el.value = filtered;
    decimalPlacesDiv.value = filtered;
  } else if (arg == "duration" && durationInput != undefined) {
    durationInput.value.$el.value = filtered;
    duration.value = filtered;
  }
};

const isAdditionOpen = ref(false);

const isSubtractionOpen = ref(false);

const isMultiplicationOpen = ref(false);

const isDivisionOpen = ref(false);

const isEmptyWarningOpen = ref(false);
const isBoundsWarningOpen = ref(false);
const isStartGameWarningOpen = ref(false);

const validateOptions = (ev: string) => {
  let inputs: number[];
  switch (ev) {
    case "Addition":
      inputs = [
        ...Object.values(additionOptions.value.firstOperand),
        ...Object.values(additionOptions.value.secondOperand),
        decimalPlacesAdd.value,
      ];
      if (inputs.some((el) => String(el).length == 0)) {
        isEmptyWarningOpen.value = true;
      } else if (inputs[0] > inputs[1] || inputs[2] > inputs[3]) {
        isBoundsWarningOpen.value = true;
      } else {
        isAdditionOpen.value = false;
      }
      break;
    case "Subtraction":
      inputs = [
        ...Object.values(subtractionOptions.value.firstOperand),
        ...Object.values(subtractionOptions.value.secondOperand),
        decimalPlacesAdd.value,
      ];
      if (inputs.some((el) => String(el).length == 0)) {
        isEmptyWarningOpen.value = true;
      } else if (inputs[0] > inputs[1] || inputs[2] > inputs[3]) {
        isBoundsWarningOpen.value = true;
      } else {
        isSubtractionOpen.value = false;
      }
    case "Multiplication":
      inputs = [
        ...Object.values(multiplicationOptions.value.firstOperand),
        ...Object.values(multiplicationOptions.value.secondOperand),
        decimalPlacesAdd.value,
      ];
      if (inputs.some((el) => String(el).length == 0)) {
        isEmptyWarningOpen.value = true;
      } else if (inputs[0] > inputs[1] || inputs[2] > inputs[3]) {
        isBoundsWarningOpen.value = true;
      } else {
        isMultiplicationOpen.value = false;
      }
    case "Division":
      inputs = [
        ...Object.values(divisionOptions.value.firstOperand),
        ...Object.values(divisionOptions.value.secondOperand),
        decimalPlacesAdd.value,
      ];
      if (inputs.some((el) => String(el).length == 0)) {
        isEmptyWarningOpen.value = true;
      } else if (inputs[0] > inputs[1] || inputs[2] > inputs[3]) {
        isBoundsWarningOpen.value = true;
      } else {
        isDivisionOpen.value = false;
      }
  }
};

const startGame = () => {
  if (
    ![addition, subtraction, multiplication, division].some((el) => el.value)
  ) {
    isStartGameWarningOpen.value = true;
  }
};
</script>

<template>
  <IonPage>
    <ion-content>
      <div class="description">
        <h1>Arithmetic Game</h1>
        <p>
          Try to solve as many problems as you can in a given amount of time.
        </p>
      </div>

      <div class="options-header">
        <h3>Options</h3>
        <IonButton fill="outline" size="small" @click="store.$reset"
          >Reset</IonButton
        >
      </div>

      <IonGrid>
        <IonRow>
          <IonCol size="12" size-sm="6" size-xl="3">
            <OperatorOptions
              name="Addition"
              modal-height="low"
              :isOpen="isAdditionOpen"
              v-model:checked="addition"
              @reset="store.additionReset"
              @dismiss="validateOptions($event)"
              @open-modal="isAdditionOpen = true"
            >
              <template #card-content>
                <p>
                  Range: ({{ additionOptions.firstOperand.lowerBound }} to
                  {{ additionOptions.firstOperand.upperBound }}) + ({{
                    additionOptions.secondOperand.lowerBound
                  }}
                  to {{ additionOptions.secondOperand.upperBound }})
                </p>
                <p>{{ decimalPlacesAdd }} decimal places</p>
              </template>
              <template #options>
                <OperatorRanges
                  symbol="+"
                  v-model:ranges="additionOptions"
                ></OperatorRanges>

                <div class="decimal-places">
                  Decimal places
                  <IonInput
                    v-model="decimalPlacesAdd"
                    :maxlength="1"
                    ref="additionDecimalsInput"
                    @ion-input="filter($event, 'addition')"
                    inputmode="numeric"
                    data-testid="decimal-places"
                  ></IonInput>
                </div>
              </template>
            </OperatorOptions>
          </IonCol>

          <IonCol size="12" size-sm="6" size-xl="3">
            <OperatorOptions
              name="Subtraction"
              v-model:checked="subtraction"
              modal-height="high"
              :is-open="isSubtractionOpen"
              @reset="store.subtractionReset"
              @dismiss="validateOptions($event)"
              @open-modal="isSubtractionOpen = true"
            >
              <template #card-content>
                <p v-if="sameAsAddition">Addition problems in reverse</p>
                <template v-else>
                  <p>
                    Range: ({{ subtractionOptions.firstOperand.lowerBound }} to
                    {{ subtractionOptions.firstOperand.upperBound }}) - ({{
                      subtractionOptions.secondOperand.lowerBound
                    }}
                    to {{ subtractionOptions.secondOperand.upperBound }})
                  </p>
                  <p>{{ decimalPlacesSub }} decimal places</p>
                  <p>
                    <span v-if="!negativeResults">No</span> negative results
                  </p>
                </template>
              </template>
              <template #options>
                <div class="inline-checkbox">
                  Addition problems in reverse
                  <IonCheckbox
                    v-model="sameAsAddition"
                    data-testid="same-as-addition"
                  ></IonCheckbox>
                </div>
                <OperatorRanges
                  symbol="-"
                  v-model:ranges="subtractionOptions"
                  :disabled="sameAsAddition"
                ></OperatorRanges>
                <div class="inline-checkbox">
                  <span :class="{ disabled: sameAsAddition }"
                    >Allow negative results</span
                  >
                  <IonCheckbox
                    v-model="negativeResults"
                    :disabled="sameAsAddition"
                    data-testid="negative-results-checkbox"
                  ></IonCheckbox>
                </div>

                <div class="decimal-places">
                  <span :class="{ disabled: sameAsAddition }"
                    >Decimal places</span
                  >
                  <IonInput
                    v-model="decimalPlacesSub"
                    :maxlength="1"
                    ref="subtractionDecimalsInput"
                    @ion-input="filter($event, 'subtraction')"
                    :disabled="sameAsAddition"
                    inputmode="numeric"
                    data-testid="decimal-places"
                  ></IonInput>
                </div>
              </template>
            </OperatorOptions>
          </IonCol>

          <IonCol size="12" size-sm="6" size-xl="3">
            <OperatorOptions
              name="Multiplication"
              v-model:checked="multiplication"
              modal-height="low"
              :is-open="isMultiplicationOpen"
              @reset="store.multiplicationReset"
              @dismiss="validateOptions($event)"
              @open-modal="isMultiplicationOpen = true"
            >
              <template #card-content>
                <p>
                  Range: ({{ multiplicationOptions.firstOperand.lowerBound }} to
                  {{ multiplicationOptions.firstOperand.upperBound }}) x ({{
                    multiplicationOptions.secondOperand.lowerBound
                  }}
                  to {{ multiplicationOptions.secondOperand.upperBound }})
                </p>
                <p>{{ decimalPlacesMult }} decimal places</p>
              </template>
              <template #options>
                <OperatorRanges
                  symbol="x"
                  v-model:ranges="multiplicationOptions"
                ></OperatorRanges>

                <div class="decimal-places">
                  Decimal places
                  <IonInput
                    v-model="decimalPlacesMult"
                    :maxlength="1"
                    ref="multiplicationDecimalsInput"
                    @ion-input="filter($event, 'multiplication')"
                    inputmode="numeric"
                    data-testid="decimal-places"
                  ></IonInput>
                </div>
              </template>
            </OperatorOptions>
          </IonCol>

          <IonCol size="12" size-sm="6" size-xl="3">
            <OperatorOptions
              name="Division"
              v-model:checked="division"
              modal-height="high"
              :is-open="isDivisionOpen"
              @reset="store.divisionReset"
              @dismiss="validateOptions($event)"
              @open-modal="isDivisionOpen = true"
            >
              <template #card-content>
                <p v-if="sameAsMultiplication">
                  Multiplication problems in reverse
                </p>
                <template v-else>
                  <p>
                    Range: ({{ divisionOptions.firstOperand.lowerBound }} to
                    {{ divisionOptions.firstOperand.upperBound }}) / ({{
                      divisionOptions.secondOperand.lowerBound
                    }}
                    to {{ divisionOptions.secondOperand.upperBound }})
                  </p>
                  <p>{{ decimalPlacesDiv }} decimal places</p>
                </template>
              </template>
              <template #options>
                <div class="inline-checkbox">
                  Multiplication problems in reverse
                  <IonCheckbox
                    v-model="sameAsMultiplication"
                    data-testid="same-as-multiplication"
                  ></IonCheckbox>
                </div>

                <OperatorRanges
                  symbol="/"
                  v-model:ranges="divisionOptions"
                  :disabled="sameAsMultiplication"
                ></OperatorRanges>
                <div class="decimal-places">
                  <span :class="{ disabled: sameAsMultiplication }"
                    >Decimal places</span
                  >
                  <IonInput
                    v-model="decimalPlacesDiv"
                    :maxlength="1"
                    ref="divisionDecimalsInput"
                    @ion-input="filter($event, 'division')"
                    :disabled="sameAsMultiplication"
                    inputmode="numeric"
                    data-testid="decimal-places"
                  ></IonInput>
                </div>
              </template>
            </OperatorOptions>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div class="duration">
        Duration:
        <IonInput
          :maxlength="8"
          v-model="duration"
          ref="durationInput"
          @ion-input="filter($event, 'duration')"
          inputmode="numeric"
        ></IonInput>
        seconds
      </div>
      <div class="start-game">
        <IonButton
          size="large"
          data-testid="start-game-button"
          @click="startGame"
          >Start Game</IonButton
        >
      </div>

      {{ [addition, subtraction, multiplication, division] }}

      <ion-toast
        :isOpen="isEmptyWarningOpen"
        :duration="5000"
        message="inputs cannot be empty"
        @didDismiss="isEmptyWarningOpen = false"
      ></ion-toast>
      <ion-toast
        :isOpen="isBoundsWarningOpen"
        :duration="5000"
        message="Lower bound must be smaller than upper bound"
        @didDismiss="isBoundsWarningOpen = false"
      ></ion-toast>
      <ion-toast
        :isOpen="isStartGameWarningOpen"
        :duration="5000"
        message="At least one operation must be selected"
        @didDismiss="isStartGameWarningOpen = false"
      ></ion-toast>
    </ion-content>
  </IonPage>
</template>

<style scoped>
.decimal-places {
  display: flex;
  align-items: center;
  justify-content: center;
}
.decimal-places ion-input {
  max-width: 5ch;
  text-align: center;
}
.description {
  margin: auto 1em;
}
.description h1 {
  color: var(--ion-color-primary-shade);
}
.disabled {
  opacity: 0.3;
}
.duration {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto 1em;
}
.duration ion-input {
  max-width: 6ch !important;
  text-align: center !important;
  min-width: 3ch;
  --background: var(--container-background);
}
.inline-checkbox {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.inline-checkbox ion-checkbox {
  margin-left: 1em;
}
.ion-page {
  align-items: center;
}
.options-header {
  margin: auto 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.options-header h3 {
  margin: auto 0;
  color: var(--ion-color-primary-shade);
}
.options-header ion-button {
  --padding-top: 0px;
  --padding-bottom: 0px;
}
.start-game {
  display: flex;
  justify-content: center;
  margin: 0.4em auto;
}
ion-content {
  max-width: 1500px;
  margin: auto;
  --padding-top: 1em;
}
.decimal-places ion-input {
  --background: var(--secondary-container-variant);
}
</style>

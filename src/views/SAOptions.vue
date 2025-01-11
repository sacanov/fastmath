<script setup lang="ts">
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { storeToRefs } from "pinia";
import OperatorOptions from "@/components/OperatorOptions.vue";
import OperatorRanges from "@/components/OperatorRanges.vue";
import OptionsHeader from "@/components/OptionsHeader.vue";
import QuitButton from "@/components/QuitButton.vue";

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
import router from "@/router";
import { Operation } from "@/types/problem";

const store = useSAGameSettingsStore();

const {
  addition,
  additionOptions,
  additionDecimalPlaces,
  subtraction,
  sameAsAddition,
  subtractionOptions,
  negativeResults,
  subtractionDecimalPlaces,
  multiplication,
  multiplicationOptions,
  multiplicationDecimalPlaces,
  division,
  sameAsMultiplication,
  divisionOptions,
  divisionDecimalPlaces,
  duration,
} = storeToRefs(store);

const additionDecimalsInput = ref();
const subtractionDecimalsInput = ref();
const multiplicationDecimalsInput = ref();
const divisionDecimalsInput = ref();
const durationInput = ref();

const filter = (value: string | undefined | null, src: string) => {
  if (value) {
    const filtered = value.replace(/[^0-9]+/g, "");

    if (src == "addition" && additionDecimalsInput.value != undefined) {
      additionDecimalsInput.value.$el.value = filtered;
      additionDecimalPlaces.value = Number(filtered);
    } else if (
      src == "subtraction" &&
      subtractionDecimalsInput.value != undefined
    ) {
      subtractionDecimalsInput.value.$el.value = filtered;
      subtractionDecimalPlaces.value = Number(filtered);
    } else if (
      src == "multiplication" &&
      multiplicationDecimalsInput.value != undefined
    ) {
      multiplicationDecimalsInput.value.$el.value = filtered;
      multiplicationDecimalPlaces.value = Number(filtered);
    } else if (src == "division" && divisionDecimalsInput.value != undefined) {
      divisionDecimalsInput.value.$el.value = filtered;
      divisionDecimalPlaces.value = Number(filtered);
    } else if (src == "duration" && durationInput.value != undefined) {
      durationInput.value.$el.value = filtered;
      duration.value = Number(filtered);
    }
  }
};

const isEmptyWarningOpen = ref(false);
const isBoundsWarningOpen = ref(false);
const isStartGameWarningOpen = ref(false);
const isDivisionByZeroWarningOpen = ref(false);

const validateOptions = (
  operation: Operation
): "divisionByZero" | "emptyInput" | "invalidBounds" | "valid" => {
  const validate = (inputs: number[]) => {
    if (inputs.some((el) => String(el).length == 0)) {
      return "emptyInput";
    } else if (inputs[0] > inputs[1] || inputs[2] > inputs[3]) {
      return "invalidBounds";
    } else {
      return "valid";
    }
  };
  switch (operation) {
    case "addition": {
      const inputs = [
        ...Object.values(additionOptions.value.firstOperand),
        ...Object.values(additionOptions.value.secondOperand),
        additionDecimalPlaces.value,
      ];
      return validate(inputs);
    }
    case "subtraction": {
      const inputs = [
        ...Object.values(subtractionOptions.value.firstOperand),
        ...Object.values(subtractionOptions.value.secondOperand),
        additionDecimalPlaces.value,
      ];
      return validate(inputs);
    }
    case "multiplication": {
      const inputs = [
        ...Object.values(multiplicationOptions.value.firstOperand),
        ...Object.values(multiplicationOptions.value.secondOperand),
        additionDecimalPlaces.value,
      ];
      return validate(inputs);
    }
    case "division": {
      const inputs = [
        ...Object.values(divisionOptions.value.firstOperand),
        ...Object.values(divisionOptions.value.secondOperand),
        additionDecimalPlaces.value,
      ];
      if (
        Object.values(divisionOptions.value.secondOperand).some((el) => el == 0)
      ) {
        return "divisionByZero";
      } else {
        return validate(inputs);
      }
    }
  }
};

const showToasts = (
  validity: "divisionByZero" | "emptyInput" | "invalidBounds" | "valid"
) => {
  switch (validity) {
    case "divisionByZero": {
      isDivisionByZeroWarningOpen.value = true;
      break;
    }
    case "emptyInput": {
      isEmptyWarningOpen.value = true;
      break;
    }
    case "invalidBounds": {
      isBoundsWarningOpen.value = true;
    }
  }
};

const startGame = () => {
  if (
    ![addition, subtraction, multiplication, division].some((el) => el.value)
  ) {
    isStartGameWarningOpen.value = true;
  } else {
    store.playing = true;
    router.push("/game/speedArithmetic");
  }
};
</script>

<template>
  <IonPage>
    <ion-content>
      <quit-button @quit="router.push('/')"></quit-button>

      <options-header title="Speed Arithmetic" @reset="store.$reset">
        Try to solve as many problems as you can in a given amount of time.
      </options-header>

      <IonGrid>
        <IonRow>
          <IonCol size="12" size-sm="6" size-xl="3">
            <OperatorOptions
              name="Addition"
              modal-height="low"
              v-model:checked="addition"
              @reset="store.additionReset"
              :can-dismiss="validateOptions('addition') === 'valid'"
              @dismiss="showToasts(validateOptions('addition'))"
            >
              <template #card-content>
                <p class="center-text">
                  Range: ({{ additionOptions.firstOperand.lowerBound }} to
                  {{ additionOptions.firstOperand.upperBound }}) + ({{
                    additionOptions.secondOperand.lowerBound
                  }}
                  to {{ additionOptions.secondOperand.upperBound }})
                </p>
                <p>{{ additionDecimalPlaces }} decimal places</p>
              </template>
              <template #options>
                <OperatorRanges
                  symbol="+"
                  v-model:ranges="additionOptions"
                ></OperatorRanges>

                <div class="decimal-places">
                  Decimal places
                  <IonInput
                    v-model="additionDecimalPlaces"
                    :maxlength="1"
                    ref="additionDecimalsInput"
                    @ion-input="filter(String($event.target.value), 'addition')"
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
              @reset="store.subtractionReset"
              :can-dismiss="validateOptions('subtraction') === 'valid'"
              @dismiss="showToasts(validateOptions('subtraction'))"
            >
              <template #card-content>
                <p v-if="sameAsAddition" class="center-text">
                  Addition problems in reverse
                </p>
                <template v-else>
                  <p class="center-text">
                    Range: ({{ subtractionOptions.firstOperand.lowerBound }} to
                    {{ subtractionOptions.firstOperand.upperBound }}) - ({{
                      subtractionOptions.secondOperand.lowerBound
                    }}
                    to {{ subtractionOptions.secondOperand.upperBound }})
                  </p>
                  <p>{{ subtractionDecimalPlaces }} decimal places</p>
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
                    v-model="subtractionDecimalPlaces"
                    :maxlength="1"
                    ref="subtractionDecimalsInput"
                    @ion-input="
                      filter(String($event.target.value), 'subtraction')
                    "
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
              @reset="store.multiplicationReset"
              :can-dismiss="validateOptions('multiplication') === 'valid'"
              @dismiss="showToasts(validateOptions('multiplication'))"
            >
              <template #card-content>
                <p class="center-text">
                  Range: ({{ multiplicationOptions.firstOperand.lowerBound }} to
                  {{ multiplicationOptions.firstOperand.upperBound }}) x ({{
                    multiplicationOptions.secondOperand.lowerBound
                  }}
                  to {{ multiplicationOptions.secondOperand.upperBound }})
                </p>
                <p>{{ multiplicationDecimalPlaces }} decimal places</p>
              </template>
              <template #options>
                <OperatorRanges
                  symbol="x"
                  v-model:ranges="multiplicationOptions"
                ></OperatorRanges>

                <div class="decimal-places">
                  Decimal places
                  <IonInput
                    v-model="multiplicationDecimalPlaces"
                    :maxlength="1"
                    ref="multiplicationDecimalsInput"
                    @ion-input="
                      filter(String($event.target.value), 'multiplication')
                    "
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
              @reset="store.divisionReset"
              :can-dismiss="validateOptions('division') === 'valid'"
              @dismiss="showToasts(validateOptions('division'))"
            >
              <template #card-content>
                <p v-if="sameAsMultiplication" class="center-text">
                  Multiplication problems in reverse
                </p>
                <template v-else>
                  <p class="center-text">
                    Range: ({{ divisionOptions.firstOperand.lowerBound }} to
                    {{ divisionOptions.firstOperand.upperBound }}) / ({{
                      divisionOptions.secondOperand.lowerBound
                    }}
                    to {{ divisionOptions.secondOperand.upperBound }})
                  </p>
                  <p>{{ divisionDecimalPlaces }} decimal places</p>
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
                    v-model="divisionDecimalPlaces"
                    :maxlength="1"
                    ref="divisionDecimalsInput"
                    @ion-input="filter(String($event.target.value), 'division')"
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
          @ion-input="filter(String($event.target.value), 'duration')"
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

      <ion-toast
        :isOpen="isEmptyWarningOpen"
        :duration="5000"
        message="inputs cannot be empty"
        @didDismiss="isEmptyWarningOpen = false"
        class="warning"
      ></ion-toast>
      <ion-toast
        :isOpen="isBoundsWarningOpen"
        :duration="5000"
        message="Lower bound must be smaller than upper bound"
        @didDismiss="isBoundsWarningOpen = false"
        class="warning"
      ></ion-toast>
      <ion-toast
        :isOpen="isStartGameWarningOpen"
        :duration="5000"
        message="At least one operation must be selected"
        @didDismiss="isStartGameWarningOpen = false"
        class="warning"
      ></ion-toast>
      <ion-toast
        :isOpen="isDivisionByZeroWarningOpen"
        :duration="5000"
        message="Divisor can't be zero"
        @didDismiss="isStartGameWarningOpen = false"
        class="warning"
      ></ion-toast>
    </ion-content>
  </IonPage>
</template>

<style scoped>
.center-text {
  text-align: center;
}
.decimal-places {
  display: flex;
  align-items: center;
  justify-content: center;
}
.decimal-places ion-input {
  max-width: 5ch;
  text-align: center;
  --background: var(--secondary-container-variant);
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
.start-game {
  display: flex;
  justify-content: center;
  margin: 0.4em auto;
}
.warning {
  --background: var(--error-container);
  --color: var(--on-error-container);
}
ion-content {
  max-width: 1500px;
  align-self: center;
  --padding-top: 1em;
}
</style>

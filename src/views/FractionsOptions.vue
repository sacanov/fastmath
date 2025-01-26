<!-- To Do
 tests
 -->

<script setup lang="ts">
import FractionEl from "@/components/FractionEl.vue";
import FractionRanges from "@/components/FractionRanges.vue";
import OptionsHeader from "@/components/OptionsHeader.vue";
import OperatorOptions from "@/components/OperatorOptions.vue";
import QuitButton from "@/components/QuitButton.vue";
import router from "@/router";
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
import { storeToRefs } from "pinia";
import { useFractionsStore } from "@/stores/FractionsSettings";
import { Operation } from "@/types/problem";

const store = useFractionsStore();

const {
  addition,
  additionRanges,
  subtraction,
  subtractionRanges,
  negativeResults,
  sameAsAddition,
  multiplication,
  multiplicationRanges,
  division,
  divisionRanges,
  duration,
} = storeToRefs(store);

const isEmptyWarningOpen = ref(false);
const isBoundsWarningOpen = ref(false);
const isStartGameWarningOpen = ref(false);
const isDivisionByZeroWarningOpen = ref(false);

const validateInput = (
  operation: Operation
): "divisionByZero" | "emptyInput" | "invalidBounds" | "valid" => {
  let divisors;
  let inputs;

  switch (operation) {
    case "addition": {
      divisors = [
        ...Object.values(additionRanges.value.firstOperand.divisor),
        ...Object.values(additionRanges.value.secondOperand.divisor),
      ];

      inputs = [
        ...divisors,
        ...Object.values(additionRanges.value.firstOperand.dividend),
        ...Object.values(additionRanges.value.secondOperand.dividend),
      ];
      break;
    }
    case "subtraction": {
      divisors = [
        ...Object.values(subtractionRanges.value.firstOperand.divisor),
        ...Object.values(subtractionRanges.value.secondOperand.divisor),
      ];

      inputs = [
        ...divisors,
        ...Object.values(subtractionRanges.value.firstOperand.dividend),
        ...Object.values(subtractionRanges.value.secondOperand.dividend),
      ];
      break;
    }
    case "multiplication": {
      divisors = [
        ...Object.values(multiplicationRanges.value.firstOperand.divisor),
        ...Object.values(multiplicationRanges.value.secondOperand.divisor),
      ];

      inputs = [
        ...divisors,
        ...Object.values(multiplicationRanges.value.firstOperand.dividend),
        ...Object.values(multiplicationRanges.value.secondOperand.dividend),
      ];
      break;
    }
    case "division": {
      divisors = [
        ...Object.values(divisionRanges.value.firstOperand.divisor),
        ...Object.values(divisionRanges.value.secondOperand.divisor),
      ];

      inputs = [
        ...divisors,
        ...Object.values(divisionRanges.value.firstOperand.dividend),
        ...Object.values(divisionRanges.value.secondOperand.dividend),
      ];
      break;
    }
  }

  if (divisors.some((el) => Number(el) === 0)) {
    return "divisionByZero";
  } else if (inputs.some((el) => String(el).length == 0)) {
    return "emptyInput";
  }
  for (let i = 0; i < inputs.length - 1; i += 2) {
    if (inputs[i] > inputs[i + 1]) {
      return "invalidBounds";
    }
  }
  return "valid";
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
    router.push("/game/fractions");
  }
};

const durationInput = ref();

const filter = (value: string | undefined | null, src: string) => {
  if (value) {
    const filtered = value.replace(/[^0-9]+/g, "");

    if (src === "duration") {
      durationInput.value.$el.value = filtered;
      duration.value = Number(filtered);
    }
  }
};
</script>

<template>
  <ion-page>
    <ion-content>
      <quit-button @quit="router.push('/')"></quit-button>

      <options-header title="Fractions" @reset="store.$reset">
        Solve fraction arithmetic problems as fast as posible, input solutions
        as x/y, only fractions in irreducible form will be scored as correct.
      </options-header>

      <ion-grid>
        <ion-row>
          <ion-col size="12" size-sm="6" size-xl="3">
            <operator-options
              name="Addition"
              v-model:checked="addition"
              modal-height="high"
              @reset="store.additionReset"
              :can-dismiss="validateInput('addition') === 'valid'"
              @dismiss="showToasts(validateInput('addition'))"
            >
              <template #card-content>
                <div class="fraction-ranges">
                  <fraction-el :width="5">
                    <template #dividend>
                      {{
                        additionRanges.firstOperand.dividend.lowerBound +
                        " to " +
                        additionRanges.firstOperand.dividend.upperBound
                      }}
                    </template>
                    <template #divisor>
                      {{
                        additionRanges.firstOperand.divisor.lowerBound +
                        " to " +
                        additionRanges.firstOperand.divisor.upperBound
                      }}
                    </template>
                  </fraction-el>
                  +
                  <fraction-el :width="5">
                    <template #dividend>
                      {{
                        additionRanges.secondOperand.dividend.lowerBound +
                        " to " +
                        additionRanges.firstOperand.dividend.upperBound
                      }}
                    </template>
                    <template #divisor>
                      {{
                        additionRanges.secondOperand.divisor.lowerBound +
                        " to " +
                        additionRanges.secondOperand.divisor.upperBound
                      }}
                    </template>
                  </fraction-el>
                </div>
              </template>
              <template #options>
                <fraction-ranges
                  symbol="+"
                  v-model:ranges="additionRanges"
                ></fraction-ranges>
              </template>
            </operator-options>
          </ion-col>
          <ion-col size="12" size-sm="6" size-xl="3">
            <operator-options
              name="Subtraction"
              v-model:checked="subtraction"
              modal-height="high"
              @reset="store.subtractionReset"
              :can-dismiss="validateInput('subtraction') === 'valid'"
              @dismiss="showToasts(validateInput('subtraction'))"
            >
              <template #card-content>
                <div v-show="sameAsAddition">Addition problems in reverse</div>
                <div v-show="!sameAsAddition" class="center-text">
                  <div class="fraction-ranges">
                    <fraction-el :width="5">
                      <template #dividend>
                        {{
                          subtractionRanges.firstOperand.dividend.lowerBound +
                          " to " +
                          subtractionRanges.firstOperand.dividend.upperBound
                        }}
                      </template>
                      <template #divisor>
                        {{
                          subtractionRanges.firstOperand.divisor.lowerBound +
                          " to " +
                          subtractionRanges.firstOperand.divisor.upperBound
                        }}
                      </template>
                    </fraction-el>
                    -
                    <fraction-el :width="5">
                      <template #dividend>
                        {{
                          subtractionRanges.secondOperand.dividend.lowerBound +
                          " to " +
                          subtractionRanges.firstOperand.dividend.upperBound
                        }}
                      </template>
                      <template #divisor>
                        {{
                          subtractionRanges.secondOperand.divisor.lowerBound +
                          " to " +
                          subtractionRanges.secondOperand.divisor.upperBound
                        }}
                      </template>
                    </fraction-el>
                  </div>
                  <p>
                    <span v-if="!negativeResults">No</span> negative results
                  </p>
                </div>
              </template>
              <template #options>
                <div class="inline-checkbox">
                  Addition problems in reverse
                  <ion-checkbox v-model="sameAsAddition"></ion-checkbox>
                </div>
                <fraction-ranges
                  symbol="-"
                  :ranges="subtractionRanges"
                  :disabled="sameAsAddition"
                >
                </fraction-ranges>
                <div
                  class="inline-checkbox"
                  :class="{ disabled: sameAsAddition }"
                >
                  Allow negative results
                  <ion-checkbox
                    v-model="negativeResults"
                    :disabled="sameAsAddition"
                  ></ion-checkbox>
                </div>
              </template> </operator-options
          ></ion-col>

          <ion-col size="12" size-sm="6" size-xl="3">
            <operator-options
              name="Multiplication"
              v-model:checked="multiplication"
              modal-height="high"
              @reset="store.multiplicationReset"
              :can-dismiss="validateInput('multiplication') === 'valid'"
              @dismiss="showToasts(validateInput('multiplication'))"
            >
              <template #card-content>
                <div class="fraction-ranges">
                  <fraction-el :width="5">
                    <template #dividend>
                      {{
                        multiplicationRanges.firstOperand.dividend.lowerBound +
                        " to " +
                        multiplicationRanges.firstOperand.dividend.upperBound
                      }}
                    </template>
                    <template #divisor>
                      {{
                        multiplicationRanges.firstOperand.divisor.lowerBound +
                        " to " +
                        multiplicationRanges.firstOperand.divisor.upperBound
                      }}
                    </template>
                  </fraction-el>
                  x
                  <fraction-el :width="5">
                    <template #dividend>
                      {{
                        multiplicationRanges.secondOperand.dividend.lowerBound +
                        " to " +
                        multiplicationRanges.firstOperand.dividend.upperBound
                      }}
                    </template>
                    <template #divisor>
                      {{
                        multiplicationRanges.secondOperand.divisor.lowerBound +
                        " to " +
                        multiplicationRanges.secondOperand.divisor.upperBound
                      }}
                    </template>
                  </fraction-el>
                </div>
              </template>
              <template #options>
                <fraction-ranges
                  symbol="x"
                  :ranges="multiplicationRanges"
                ></fraction-ranges>
              </template> </operator-options
          ></ion-col>

          <ion-col size="12" size-sm="6" size-xl="3">
            <operator-options
              name="Division"
              v-model:checked="division"
              modal-height="high"
              @reset="store.divisionReset"
              :can-dismiss="validateInput('division') == 'valid'"
              @dismiss="showToasts(validateInput('division'))"
            >
              <template #card-content>
                <div class="fraction-ranges">
                  <fraction-el :width="5">
                    <template #dividend>
                      {{
                        divisionRanges.firstOperand.dividend.lowerBound +
                        " to " +
                        divisionRanges.firstOperand.dividend.upperBound
                      }}
                    </template>
                    <template #divisor>
                      {{
                        divisionRanges.firstOperand.divisor.lowerBound +
                        " to " +
                        divisionRanges.firstOperand.divisor.upperBound
                      }}
                    </template>
                  </fraction-el>
                  /
                  <fraction-el :width="5">
                    <template #dividend>
                      {{
                        divisionRanges.secondOperand.dividend.lowerBound +
                        " to " +
                        divisionRanges.firstOperand.dividend.upperBound
                      }}
                    </template>
                    <template #divisor>
                      {{
                        divisionRanges.secondOperand.divisor.lowerBound +
                        " to " +
                        divisionRanges.secondOperand.divisor.upperBound
                      }}
                    </template>
                  </fraction-el>
                </div>
              </template>
              <template #options>
                <fraction-ranges
                  symbol="/"
                  :ranges="divisionRanges"
                ></fraction-ranges>
              </template> </operator-options
          ></ion-col>
        </ion-row>
      </ion-grid>
      <div class="duration">
        Duration:
        <ion-input
          :maxlength="8"
          v-model="duration"
          ref="durationInput"
          @ion-input="filter(String($event.target.value), 'duration')"
          inputmode="numeric"
        ></ion-input>
        seconds
      </div>
      <div class="start-game">
        <ion-button
          size="large"
          data-testid="start-game-button"
          @click="startGame"
          >Start Game</ion-button
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
  </ion-page>
</template>

<style scoped>
.center-text {
  text-align: center;
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
.fraction-ranges {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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

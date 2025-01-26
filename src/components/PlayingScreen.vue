<script setup lang="ts">
import { FractionGame, Game, SAGame } from "@/composables/game";
import { ref } from "vue";
import { IonInput } from "@ionic/vue";
import FractionEl from "./FractionEl.vue";
import ScreenKeyboard from "./ScreenKeyboard.vue";
import { Fraction } from "@/composables/fraction";

const props = defineProps<{
  game: Game;
  showingKeyboard: boolean;
}>();

const inputValue = ref("");
const inputEl = ref();

const input = (value: string) => {
  // validate input

  const filtered =
    props.game instanceof FractionGame
      ? value.replace(/[^0-9-/]+/g, "")
      : value.replace(/[^0-9-.]+/g, "");
  inputValue.value = filtered;
  if (inputEl.value) {
    inputEl.value.$el.value = filtered;

    if (verifyAnswer(filtered)) {
      inputEl.value.$el.value = "";
      inputValue.value = "";
    }
  }
};

const verifyAnswer = (str: string): boolean => {
  if (props.game instanceof FractionGame) {
    return props.game.verifyAnswer(Fraction.fromString(str));
  } else {
    return props.game.verifyAnswer(Number(str));
  }
};

const keyPressed = (key: string) => {
  if (key === "CE") {
    input(inputValue.value.slice(0, -1));
  } else if (key == "AC") {
    input("");
  } else {
    input(inputValue.value + key);
  }
};

const focusInput = () => {
  inputEl.value.$el.setFocus();
};

const resetInput = () => {
  inputValue.value = "";
};

defineExpose({ focusInput, resetInput });
</script>

<template>
  <div
    class="current-problem"
    :class="{ 'centered-in-page': !props.showingKeyboard }"
  >
    <h1 v-if="game instanceof SAGame">
      {{
        `${game.getCurrentProblem().value.firstOperand} ${
          game.getCurrentProblem().value.operation
        } ${game.getCurrentProblem().value.secondOperand}`
      }}
    </h1>
    <h3 v-else-if="game instanceof FractionGame" class="fraction-problem">
      <fraction-el :width="1.5">
        <template #dividend>
          {{ game.getCurrentProblem().value.firstOperand.dividend }}
        </template>
        <template #divisor>
          {{ game.getCurrentProblem().value.firstOperand.divisor }}
        </template>
      </fraction-el>
      <span class="operation">
        {{ game.getCurrentProblem().value.operation }}</span
      >
      <fraction-el :width="1.5">
        <template #dividend>
          {{ game.getCurrentProblem().value.secondOperand.dividend }}
        </template>
        <template #divisor>
          {{ game.getCurrentProblem().value.secondOperand.divisor }}
        </template>
      </fraction-el>
    </h3>
    <ion-input
      :disabled="props.showingKeyboard"
      fill="solid"
      :value="inputValue"
      @ion-input="input(String($event.target.value))"
      inputmode="numeric"
      ref="inputEl"
    ></ion-input>
  </div>
  <div class="keyboard" v-if="showingKeyboard">
    <screen-keyboard @key-pressed="(n) => keyPressed(n)"> </screen-keyboard>
  </div>
</template>

<style scoped>
h1 {
  margin: auto auto 1rem auto;
  color: var(--ion-color-primary-shade);
  font-size: xx-large;
  text-align: center;
}
h3 {
  margin: auto;
  color: var(--ion-color-primary);
  text-align: center;
}
.current-problem {
  margin: 1em auto 1em auto;
}
.fraction-problem {
  display: flex;
  justify-content: center;
  align-items: center;
}
.keyboard {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: min(50vh, calc(100vh - 15rem));
}
.operation {
  margin: auto 12px;
}
ion-input {
  max-width: 16ch;
  margin: 0 auto;
  text-align: center;
}
screen-keyboard {
  height: 100%;
}

@media screen and (max-height: 640px) {
  h1 {
    font-size: x-large;
    margin: auto;
  }
  h3 {
    font-size: large;
  }
  .current-problem {
    margin: 1rem auto 1rem auto;
  }
  .keyboard {
    height: calc(100vh - 11rem);
  }
}
</style>

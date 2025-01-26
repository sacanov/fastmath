<script setup lang="ts">
import { FractionGame, Game, SAGame } from "@/composables/game";
import { IonButton, IonIcon } from "@ionic/vue";
import { homeOutline, refresh } from "ionicons/icons";
import FractionEl from "./FractionEl.vue";
import { FAGame } from "@/composables/faGame";

defineProps<{ game: Game | FAGame }>();
</script>

<template>
  <div class="results">
    <div class="results-container centered-in-page">
      <h1>Game Over</h1>
      <h3>Score: {{ game.getScore() }}</h3>
      <div class="last-problem">
        <h6>Last Problem was</h6>
        <p v-if="game instanceof SAGame">
          {{
            `${game.getCurrentProblem().value.firstOperand} ${
              game.getCurrentProblem().value.operation
            } ${game.getCurrentProblem().value.secondOperand} = ${
              game.getCurrentProblem().value.solution
            }`
          }}
        </p>
        <p v-else-if="game instanceof FractionGame" class="fraction-problem">
          <fraction-el :width="1.5">
            <template #dividend>
              {{ game.getCurrentProblem().value.firstOperand.dividend }}
            </template>
            <template #divisor>
              {{ game.getCurrentProblem().value.firstOperand.divisor }}
            </template>
          </fraction-el>
          {{ game.getCurrentProblem().value.operation }}
          <fraction-el :width="1.5">
            <template #dividend>
              {{ game.getCurrentProblem().value.secondOperand.dividend }}
            </template>
            <template #divisor>
              {{ game.getCurrentProblem().value.secondOperand.divisor }}
            </template>
          </fraction-el>
          =
          <fraction-el :width="1.5">
            <template #dividend>
              {{ game.getCurrentProblem().value.solution.dividend }}
            </template>
            <template #divisor>
              {{ game.getCurrentProblem().value.solution.divisor }}
            </template>
          </fraction-el>
        </p>
        <p v-else-if="game instanceof FAGame">
          {{ game.numbers.join("+") }} = {{ game.solution }}
        </p>
      </div>

      <div class="buttons">
        <ion-button @click="$emit('play-again')"
          ><ion-icon :icon="refresh"></ion-icon
        ></ion-button>
        <ion-button @click="$emit('go-home')"
          ><ion-icon :icon="homeOutline"></ion-icon
        ></ion-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.results-container {
  background-color: var(--primary-container);
  color: var(--on-primary-container);
  width: 12rem;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
}
.fraction-problem {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: auto;
}
ion-button {
  --background: var(--ion-color-tertiary-shade);
  margin: 0 5px;
  color: var(--on-tertiary);
}
</style>

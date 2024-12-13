<!-- To Do 

game finishing sequence, show last answer, score stats, disable input -->

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Timer } from "@/composables/timer";
import {
  isPlatform,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
} from "@ionic/vue";
import { useGameSettingsStore } from "@/stores/gameSettings";
import { Game } from "@/composables/game";
import { closeSharp, refreshOutline } from "ionicons/icons";

const store = useGameSettingsStore();

const onMobile = isPlatform("mobile");

const startingCountdown = new Timer(3);

const showingStartingCountdown = ref(false);

const runCountdown = () => {
  startingCountdown.restart();
  showingStartingCountdown.value = true;
};

onMounted(() => {
  console.log(onMobile);
  runCountdown();
});

let game: Game = new Game(store);

const startGame = () => {
  if (!game || game.isActive()) {
    game = new Game(store);
  }
  game.start();
};

watch(startingCountdown.getTime(), (newValue) => {
  if (newValue == 0) {
    startGame();
    showingStartingCountdown.value = false;
  }
  if (!onMobile) {
    inputEl.value.$el.setFocus();
  }
});

const inputEl = ref();

const input = (value: string) => {
  const filtered = value.replace(/[^0-9-]+/g, "");
  if (inputEl.value) {
    inputEl.value.$el.value = filtered;
    if (game.verifyAnswer(Number(filtered))) {
      inputEl.value.$el.value = "";
    }
  }
};
</script>
<template>
  <ion-page>
    <ion-content
      v-show="showingStartingCountdown"
      class="starting-countdown-content"
      ><h1>{{ startingCountdown.getTime() }}</h1></ion-content
    >
    <ion-content v-show="!showingStartingCountdown">
      <ion-grid>
        <ion-row class="ion-justify-content-between">
          <ion-col size="5"
            ><h3>{{ game.getTimeLeft() }}</h3></ion-col
          >
          <ion-col size="5"
            ><div class="buttons">
              <ion-button fill="clear" @click="runCountdown">
                <ion-icon :icon="refreshOutline"></ion-icon>
              </ion-button>
              <ion-button fill="clear">
                <ion-icon :icon="closeSharp"></ion-icon>
              </ion-button></div
          ></ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h3>Score: {{ game.getScore() }}</h3>
          </ion-col>
        </ion-row>
      </ion-grid>

      {{
        `${game.getCurrentProblem().value.firstOperand} ${
          game.getCurrentProblem().value.operation
        } ${game.getCurrentProblem().value.secondOperand}`
      }}

      <ion-input
        v-if="!onMobile"
        fill="solid"
        @ion-input="input(String($event.target.value))"
        inputmode="numeric"
        ref="inputEl"
      ></ion-input>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
h3 {
  margin: auto;
}
.buttons {
  display: flex;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
}
</style>

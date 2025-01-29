<script setup lang="ts">
import { Timer } from "@/composables/timer";
import { useFAGameSettingsStore } from "@/stores/FAGameSettings";
import { nextTick, onMounted, ref, Ref, watch } from "vue";
import GameToolbar from "@/components/GameToolbar.vue";
import { IonButton, IonContent, IonInput, IonPage } from "@ionic/vue";
import router from "@/router";
import { FAGame } from "@/composables/faGame";
import GameResults from "@/components/GameResults.vue";

const startingCountdown = new Timer(3);

const stage: Ref<"starting" | "playing" | "finished"> = ref("starting");

const store = useFAGameSettingsStore();

const game = new FAGame(store);
const solution = ref();

const startNewGame = () => {
  if (startingCountdown.getStartingTime()) {
    startingCountdown.restart();
    game.reset();
  } else {
    startingCountdown.start();
  }

  stage.value = "starting";
  solution.value = "";
};

onMounted(() => {
  startNewGame();
});

let n: Ref<number | undefined>;

watch(startingCountdown.getTime(), (newValue) => {
  // start game when countdown reaches 0
  if (newValue == 0) {
    stage.value = "playing";
    n = game.flashNumbers();
  }
});

const flashingFinished = game.flashingFinished();

const inputEl = ref();

watch(flashingFinished, (newValue) => {
  if (newValue === true) {
    // set focus when app is running on web
    nextTick(() => {
      inputEl.value.$el.setFocus();
    });
  }
});

const answer = () => {
  game.verifyAnswer(Number(solution.value));
  stage.value = "finished";
};
</script>

<template>
  <ion-page>
    <ion-content>
      <game-toolbar
        @quit="router.back()"
        @restart-game="startNewGame"
      ></game-toolbar>

      <h1 class="centered-in-page" v-show="stage === 'starting'">
        {{ startingCountdown.getTime() }}
      </h1>
      <h1
        v-show="stage == 'playing' && !flashingFinished"
        class="centered-in-page flashing-numbers"
      >
        {{ n }}
      </h1>
      <div
        class="solution centered-in-page"
        v-show="stage === 'playing' && flashingFinished"
      >
        <ion-input
          v-model="solution"
          ref="inputEl"
          placeholder="answer"
          inputmode="numeric"
        ></ion-input>
        <ion-button @click="answer"> enter</ion-button>
      </div>
      <game-results
        v-show="stage === 'finished'"
        :game="game"
        @play-again="startNewGame"
        @go-home="router.back()"
      ></game-results>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-content {
  --ion-background-color: var(--surface-bright);
}
ion-input {
  max-width: 12ch;
  --background: var(--container-background);
  text-align: center;
}
h1 {
  margin: auto auto 1rem auto;
  color: var(--ion-color-primary-shade);
  font-size: xx-large;
  text-align: center;
}
.flashing-numbers {
  color: var(--ion-text-color);
}
.solution {
  display: flex;
  flex-direction: column;
}
.solution ion-input {
  margin-bottom: 20px;
}
</style>

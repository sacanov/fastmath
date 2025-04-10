<script setup lang="ts">
import { nextTick, onMounted, Ref, ref, watch } from "vue";
import { Timer } from "@/composables/timer";
import { isPlatform, IonContent, IonPage } from "@ionic/vue";
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { useFractionsStore } from "@/stores/FractionsSettings";
import { FractionGame, Game, SAGame } from "@/composables/game";
import GameResults from "@/components/GameResults.vue";
import GameToolbar from "@/components/GameToolbar.vue";
import PlayingScreen from "@/components/PlayingScreen.vue";
import router from "@/router";

const props = defineProps<{ type: "speedArithmetic" | "fractions" }>();

const onMobile = isPlatform("android") || isPlatform("ios");

console.log(onMobile);
const startingCountdown = new Timer(3);

const stage: Ref<"starting" | "playing" | "finished"> = ref("starting");

const createGame = (type: "speedArithmetic" | "fractions"): Game => {
  switch (type) {
    case "speedArithmetic": {
      return new SAGame(useSAGameSettingsStore());
    }
    case "fractions": {
      return new FractionGame(useFractionsStore());
    }
  }
};

const game = createGame(props.type);

const startNewGame = () => {
  if (startingCountdown.getStartingTime()) {
    startingCountdown.restart();
  } else {
    startingCountdown.start();
  }

  stage.value = "starting";
  screenEl.value.resetInput();
};

onMounted(() => {
  startNewGame();
});

const screenEl = ref();

watch(startingCountdown.getTime(), (newValue) => {
  // start game when countdown reaches 0
  if (newValue == 0) {
    game.start();
    stage.value = "playing";
    if (!onMobile) {
      // set focus when app is running on web
      nextTick(() => {
        screenEl.value.focusInput();
      });
    }
  }
});

watch(game.getTimeLeft(), (newValue) => {
  if (newValue == 0) {
    stage.value = "finished";
  }
});

const quit = () => {
  router.back();
};
</script>
<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <game-toolbar
        @restart-game="startNewGame"
        @quit="quit"
        :time-left="game.getTimeLeft()"
        :score="game.getScore()"
        v-show="stage !== 'finished'"
      ></game-toolbar>

      <h1 class="centered-in-page" v-show="stage === 'starting'">
        {{ startingCountdown.getTime() }}
      </h1>

      <div v-show="stage === 'playing'">
        <h3>Score: {{ game.getScore() }}</h3>

        <playing-screen
          :game="game"
          :showing-keyboard="onMobile"
          ref="screenEl"
        ></playing-screen>
      </div>

      <game-results
        :game="game"
        v-show="stage === 'finished'"
        @play-again="startNewGame"
        @go-home="quit"
      ></game-results>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-content {
  --ion-background-color: var(--surface-bright);
}
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

@media screen and (max-height: 640px) {
  h1 {
    font-size: x-large;
    margin: auto;
  }
  h3 {
    font-size: large;
  }
}
</style>

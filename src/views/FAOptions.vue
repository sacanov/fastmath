<script setup lang="ts">
import { IonButton, IonContent, IonInput, IonPage } from "@ionic/vue";
import router from "@/router";
import { useFAGameSettingsStore } from "@/stores/FAGameSettings";
import QuitButton from "@/components/QuitButton.vue";
import OptionsHeader from "@/components/OptionsHeader.vue";
import { storeToRefs } from "pinia";

const store = useFAGameSettingsStore();

const { numberOfDigits, timePerNumber, numberOfOperands } = storeToRefs(store);

const startGame = () => {
  store.playing = true;
  router.push("/flashGame");
};
</script>

<template>
  <ion-page>
    <ion-content
      ><quit-button @quit="router.push('/')"></quit-button>

      <options-header title="Flash Arithmetic" @reset="store.$reset">
        A series of numbers will flash on the screen one at a time, at each step
        you will solve one problem, for example if you select addition and the
        numbers that flash on the screen are 1,2,3,4 and 5, the correct answer
        will be 1+2+3+4+5 = 15.
      </options-header>

      <div class="options">
        Number of digits<ion-input
          :maxlength="1"
          v-model="numberOfDigits"
        ></ion-input>

        Number of problems<ion-input
          :maxlength="3"
          v-model="numberOfOperands"
        ></ion-input>

        Time per problem (seconds)<ion-input
          :maxlength="3"
          v-model="timePerNumber"
        ></ion-input>
      </div>
      <div class="start-game">
        <ion-button
          size="large"
          data-testid="start-game-button"
          @click="startGame"
          >Start Game</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-content {
  max-width: 1500px;
  align-self: center;
  --padding-top: 1em;
}
ion-input {
  max-width: 8ch;
  --background: var(--container-background);
  text-align: center;
}
.options {
  margin: 0.5em 1em 15px 1em;
  display: grid;
  grid-template-columns: 1fr 8ch;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 10px;
  align-items: center;
}
.start-game {
  display: flex;
  justify-content: center;
  margin: 0.4em auto;
}
</style>

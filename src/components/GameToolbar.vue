<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/vue";
import { closeSharp, refreshOutline } from "ionicons/icons";

const props = defineProps(["timeLeft", "score"]);
</script>

<template>
  <ion-grid>
    <ion-row class="ion-justify-content-between">
      <ion-col size="5"
        ><h3>{{ props.timeLeft }}</h3></ion-col
      >
      <ion-col size="5"
        ><div class="buttons">
          <ion-button fill="clear" @click="$emit('restart-game')">
            <ion-icon :icon="refreshOutline"></ion-icon>
          </ion-button>
          <ion-button fill="clear" @click="$emit('quit')">
            <ion-icon :icon="closeSharp"></ion-icon>
          </ion-button></div
      ></ion-col>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
ion-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
h3 {
  margin: auto;
  color: var(--ion-color-primary);
  text-align: center;
}
.buttons {
  display: flex;
  align-items: center;
}
@media screen and (max-height: 640px) {
  h3 {
    font-size: large;
  }
  ion-row {
    height: 2rem;
  }
}
</style>

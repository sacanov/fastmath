<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { closeSharp } from "ionicons/icons";
</script>

<template>
  <ion-button fill="clear" @click="$emit('quit')">
    <ion-icon :icon="closeSharp"></ion-icon>
  </ion-button>
</template>

<style scoped>
ion-button {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

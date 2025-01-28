<template>
  <ion-page>
    <ion-content
      ><ion-item button @click="router.push('/keyboard')"
        ><ion-label>keyboard</ion-label></ion-item
      ></ion-content
    >
  </ion-page>
</template>

<script setup lang="ts">
import router from "@/router";
import { IonContent, IonItem, IonLabel, IonPage } from "@ionic/vue";
</script>

<style scoped>
ion-content {
  max-width: 20rem;
  align-self: center;
}
ion-card {
  border-radius: 10px;
  margin: 1rem 0;
  padding: 15px;
  --background: var(--primary-container);
  --color: var(--on-primary-container);
}
h1 {
  margin: 5px auto;
}
</style>

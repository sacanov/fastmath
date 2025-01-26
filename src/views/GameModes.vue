<script setup lang="ts">
import { IonCard, IonContent, IonPage } from "@ionic/vue";
import router from "@/router";
</script>

<template>
  <ion-page>
    <ion-content>
      <h1 class="title">Game modes</h1>
      <ion-card :button="true" @click="router.push('/speedArithmetic')">
        <h1>Speed arithmetic</h1>
        <p>Solve problems with a time constraint</p>
      </ion-card>
      <ion-card :button="true" @click="router.push('/fractions')">
        <h1>Fractions</h1>
        <p>Speed arithmetic with fractions</p>
      </ion-card>
      <ion-card :button="true" @click="router.push('/flashArithmetic')">
        <h1>Flash arithmetic</h1>
        <p>Solve problems with flashing numbers</p>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.title {
  text-align: center;
  margin-top: 20px;
  color: var(--ion-color-secondary);
  font-weight: 600;
}
h1 {
  margin: auto;
}
p {
  margin: 10px 0;
}
ion-card {
  border-radius: 10px;
  margin: 1rem 0;
  padding: 15px;
  --background: var(--primary-container);
  --color: var(--on-primary-container);
}
ion-content {
  --padding-start: 1rem;
  --padding-end: 1rem;
  max-width: 25rem;
  align-self: center;
}
</style>

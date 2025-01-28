<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="play" href="/tabs/play">
          <ion-icon aria-hidden="true" :icon="play" />
          <ion-label>Play</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="school" />
          <ion-label>Learn</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="tab3" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="options" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { options, play } from "ionicons/icons";
</script>

<style scoped>
ion-tab-button {
  --color: var(--ion-color-secondary);
}
</style>

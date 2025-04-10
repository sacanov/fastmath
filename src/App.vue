<template>
  <!-- <suspense> -->
  <ion-app>
    <ion-router-outlet />
  </ion-app>
  <!-- </suspense> -->
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, isPlatform } from "@ionic/vue";
// import { Suspense } from "vue";

import { StatusBar } from "@capacitor/status-bar";

if (!(isPlatform("desktop") || isPlatform("mobileweb"))) {
  StatusBar.setOverlaysWebView({ overlay: false });
}
</script>

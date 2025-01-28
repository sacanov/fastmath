<script setup lang="ts">
import {
  IonAlert,
  IonPage,
  IonContent,
  IonRange,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import ScreenKeyboard from "@/components/ScreenKeyboard.vue";
import { getKeyboardSettings } from "@/composables/preferences";
import { onMounted, Ref, ref } from "vue";
import QuitButton from "./QuitButton.vue";
import { setKeyboardSettings } from "@/composables/preferences";
import router from "@/router";

const width = ref(100);

const height = ref(100);

const position: Ref<"left" | "center" | "right"> = ref("center");
onMounted(async () => {
  const settings = await getKeyboardSettings();

  width.value = settings.width;

  height.value = settings.height;

  position.value = settings.position;
});

const alertButtons = [
  {
    text: "discard",
    handler: () => {
      router.back();
    },
  },
  {
    text: "confirm",

    handler: async () => {
      await setKeyboardSettings({
        height: height.value,
        width: width.value,
        position: position.value,
      });
      router.back();
    },
  },
];
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <quit-button id="quit-button"></quit-button>
      <h3>keyboard size</h3>
      height
      <ion-range
        :min="20"
        :value="height"
        @ion-change="($event) => (height = $event.detail.value as number)"
      ></ion-range>
      width
      <ion-range
        :min="20"
        :value="width"
        @ion-change="($event) => (width = $event.detail.value as number)"
      ></ion-range>

      position
      <ion-segment
        :value="position"
        @ion-change="($event) => (position = $event.detail.value as ('left'|'center'|'right'))"
      >
        <ion-segment-button value="left">left</ion-segment-button>
        <ion-segment-button value="center">center</ion-segment-button>
        <ion-segment-button value="right">right</ion-segment-button>
      </ion-segment>

      <Suspense>
        <screen-keyboard
          :height="height"
          :width="width"
          :position="position"
        ></screen-keyboard
      ></Suspense>

      <ion-alert
        trigger="quit-button"
        header="Save changes?"
        :buttons="alertButtons"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>

<style>
h3 {
  color: var(--ion-color-primary);
}
ion-content {
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 1rem;
}
ion-range {
  margin: auto 10px;
}
ion-content {
  max-width: 20rem;
  align-self: center;
}
</style>

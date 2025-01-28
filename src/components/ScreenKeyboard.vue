<!-- ToDo 

let user change height, position, width -->

<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/vue";
import { backspaceSharp } from "ionicons/icons";

const props = defineProps<{
  height: number;
  width: number;
  position: "left" | "center" | "right";
}>();
</script>

<template>
  <div
    class="keyboard"
    :class="props.position"
    :style="{ width: props.width + '%' }"
  >
    <ion-grid
      :fixed="true"
      :style="{
        height: props.height + '%',
      }"
    >
      <ion-row>
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', 'AC')"
            >AC</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '-')"
            >-</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '/')"
            >/</ion-button
          ></ion-col
        >
      </ion-row>
      <ion-row>
        <ion-col size="4">
          <ion-button expand="block" @click="$emit('key-pressed', '1')"
            >1</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '2')"
            >2</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '3')"
            >3</ion-button
          ></ion-col
        >
      </ion-row>
      <ion-row>
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '4')"
            >4</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '5')"
            >5</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '6')"
            >6</ion-button
          ></ion-col
        >
      </ion-row>
      <ion-row>
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '7')"
            >7</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '8')"
            >8</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '9')"
            >9</ion-button
          ></ion-col
        >
      </ion-row>
      <ion-row>
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '.')"
            >.</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', '0')"
            >0</ion-button
          ></ion-col
        >
        <ion-col size="4"
          ><ion-button expand="block" @click="$emit('key-pressed', 'CE')">
            <ion-icon :icon="backspaceSharp"></ion-icon> </ion-button
        ></ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
<style scoped>
.keyboard {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: min(50vh, calc(100vh - 15rem));
  display: flex;
  align-items: end;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.center {
  left: 50%;
  transform: translateX(-50%);
}
.keyboard-wrapper {
  width: 1fr;
  height: 1fr;
  display: flex;
}
ion-button {
  height: 90%;
}
ion-row {
  height: 20%;
}
</style>

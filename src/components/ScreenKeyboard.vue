<!-- ToDo 

let user change height, position, width -->

<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/vue";
import { backspaceSharp } from "ionicons/icons";
</script>

<template>
  <ion-grid :fixed="true">
    <ion-row>
      <ion-col>
        <ion-button expand="block" @click="$emit('key-pressed', '1')"
          >1</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '2')"
          >2</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '3')"
          >3</ion-button
        ></ion-col
      >
    </ion-row>
    <ion-row>
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '4')"
          >4</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '5')"
          >5</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '6')"
          >6</ion-button
        ></ion-col
      >
    </ion-row>
    <ion-row>
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '7')"
          >7</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '8')"
          >8</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '9')"
          >9</ion-button
        ></ion-col
      >
    </ion-row>
    <ion-row>
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '-')"
          >-</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '0')"
          >0</ion-button
        ></ion-col
      >
      <ion-col
        ><ion-button expand="block" @click="$emit('key-pressed', '-1')">
          <ion-icon :icon="backspaceSharp"></ion-icon> </ion-button
      ></ion-col>
    </ion-row>
  </ion-grid>
</template>
<style scoped>
ion-button {
  height: 90%;
}
ion-grid {
  height: 100%;
}
ion-row {
  height: 25%;
}
</style>

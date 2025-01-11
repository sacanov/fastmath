<script setup lang="ts">
import { IonButton } from "@ionic/vue";

const props = defineProps<{ title: string }>();
defineEmits(["reset"]);
</script>

<template>
  <div class="description">
    <h1>{{ props.title }}</h1>
    <p>
      <slot></slot>
    </p>
  </div>

  <div class="options-header">
    <h3>Options</h3>
    <IonButton fill="outline" size="small" @click="$emit('reset')"
      >Reset</IonButton
    >
  </div>
</template>

<style scoped>
.description {
  margin: auto 1em;
}
.description h1 {
  color: var(--ion-color-primary-shade);
}
.options-header {
  margin: auto 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.options-header h3 {
  margin: auto 0;
  color: var(--ion-color-primary-shade);
}
.options-header ion-button {
  --padding-top: 0px;
  --padding-bottom: 0px;
}
</style>

<script setup lang="ts">
const props = defineProps<{ width: number }>();
</script>

<template>
  <div class="fraction">
    <div class="frac-el"><slot name="dividend"></slot></div>
    <hr :style="{ width: props.width + 0.1 + 'em' }" />
    <div class="frac-el">
      <slot name="divisor"></slot>
    </div>
  </div>
</template>

<style scoped>
hr {
  border-width: thin;
  box-sizing: border-box;
  height: 2px;
  margin: 2px;
}
.frac-el {
  display: flex;
}
.fraction {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

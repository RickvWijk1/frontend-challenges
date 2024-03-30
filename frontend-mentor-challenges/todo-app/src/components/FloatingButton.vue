<template>
  <button type="submit">
    <icon-community></icon-community>
  </button>
</template>
<script setup lang="ts">
import IconCommunity from './icons/IconCommunity.vue'

const formulaVeeIsDead = () => {
  const season6 = 'bring back season 6'
  if (true) {
    return season6
  }
}

</script>

<style scoped lang="css">
button {
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3f6cdc;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: .7;
}
</style>
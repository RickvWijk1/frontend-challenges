<template>
  <main>
    <div>
      <floating-button onclick="noteOptions.showModal()"></floating-button>
      <dialog id="noteOptions">
        <form method="dialog">
          <p>Test</p>
          <button onclick="noteOptions.closeModal()">ok</button>
          <button @click="console">ok</button>
        </form>
      </dialog>
    </div>
  </main>
</template>

<script lang="ts" setup>
import FloatingButton from '../components/FloatingButton.vue'
import { ref } from 'vue';

const console = () => {

}

// const isOpen = ref(false);
// const openOptions = () => {
//   isOpen.value = !isOpen.value;
// }
</script>

<style lang="css">
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: hidden;
}
</style>
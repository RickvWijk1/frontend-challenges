<template>
  <main class="flex justify-center w-full">
    <hero-background />
    <div class="flex flex-col w-full max-w-3xl gap-10 px-6 pt-10">
      <top-bar />
      <section class="relative flex flex-col items-center justify-center gap-6 pb-10">
        <todo-input />
        <todo-list />
        <todo-filters v-if="deviceStore.mobile" />
        <p class="text-gray-400">Drag and drop to reorder list</p>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import TopBar from '@/components/TopBar.vue';
import HeroBackground from '@/components/HeroBackground.vue';
import { useDeviceStore } from '@/stores/device';
import TodoInput from '@/components/todo/TodoInput.vue';
import TodoList from '@/components/todo/TodoList.vue';
import TodoFilters from '@/components/todo/TodoFilters.vue';

const deviceStore = useDeviceStore();

</script>
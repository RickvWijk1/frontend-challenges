<template>
  <main>
    <hero-background />
    <div class="absolute inset-0 z-10 flex flex-col gap-10 px-6 pt-10">
      <top-bar />
      <section class="relative flex flex-col gap-6 justify-center items-center pb-10">
        <todo-input />
        <todo-list />
        <todo-filters />
        <p class="text-gray-400">Drag and drop to reorder list</p>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import TopBar from '@/components/TopBar.vue';
import HeroBackground from '@/components/HeroBackground.vue';
import TodoInput from '@/components/todo/TodoInput.vue';
import TodoList from '@/components/todo/TodoList.vue';
import TodoFilters from '@/components/todo/TodoFilters.vue';

</script>
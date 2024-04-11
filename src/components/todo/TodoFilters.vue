<template>
    <div data-tabs="tabs" role="list"
        class="grid  w-full justify-center grid-cols-[auto_auto_auto] gap-4 px-6 py-4 bg-white rounded-md dark:text-gray-400 dark:bg-slate-800">
        <span @click="setFilter('All')" :class="{ 'font-bold': todoStore.currentFilter === 'All' }"
            class="cursor-pointer">All</span>
        <span @click="setFilter('Active')" :class="{ 'font-bold': todoStore.currentFilter === 'Active' }"
            class="cursor-pointer">Active</span>
        <span @click="setFilter('Completed')" :class="{ 'font-bold': todoStore.currentFilter === 'Completed' }"
            class="cursor-pointer">Completed</span>
    </div>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

const setFilter = (filter: 'All' | 'Active' | 'Completed') => {
    todoStore.currentFilter = filter;
}
</script>
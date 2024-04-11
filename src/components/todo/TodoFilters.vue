<template>
    <div
        class="grid sm:p-0 sm:w-auto w-full justify-center grid-cols-[auto_auto_auto] gap-4 px-6 py-4 bg-white rounded-md dark:bg-slate-800">
        <span v-for="filter in filters" :key="filter" @click="setFilter(filter)"
            class="cursor-pointer hover:text-black dark:hover:text-white dark:text-gray-400"
            :class="[todoStore.currentFilter === filter ? 'text-blue-400 dark:text-blue-500 hover:text-blue-400 font-bold' : '']">
            {{ filter }}
        </span>
    </div>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

const filters: Filters[] = ['All', 'Active', 'Completed'];

const setFilter = (filter: Filters) => {
    todoStore.currentFilter = filter;
}
</script>
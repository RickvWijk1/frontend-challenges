<template>
    <div data-tabs="tabs" role="list"
        class="grid  w-full justify-center grid-cols-[auto_auto_auto] gap-4 px-6 py-4 bg-white rounded-md dark:text-gray-400 dark:bg-slate-800">
        <span v-for="filter in filters" :key="filter" @click="setFilter(filter)" class="cursor-pointer"
            :class="[todoStore.currentFilter === filter ? 'text-blue-400 font-bold' : '']">
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
<template>
    <div class="grid w-full justify-center grid-cols-[auto_auto_auto] gap-4 px-6 py-4 bg-white rounded-md dark:text-gray-400 dark:bg-slate-800">
        <span @click="todoStore.getAllItems" class="cursor-pointer">All</span>
        <span @click="filterUncompletedItems" class="cursor-pointer">Active</span>
        <span @click="filterCompletedItems" class="cursor-pointer">Completed</span>
    </div>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();
console.log(todoStore.todoList)

const filterCompletedItems = () => {
    todoStore.getCompletedItems();
}

const filterUncompletedItems = () => {
   todoStore.getUncompletedItems();
};


</script>
<template>
    <div class="bg-white rounded-md shadow-xl dark:bg-slate-800 dark:text-white">
        <div class="px-6 py-4 border border-gray-200 border-solid dark:border-gray-700 dark:border first:rounded-t-md last:rounded-b-md"
            v-for="item in list">
            <div class="grid justify-between grid-cols-[auto_1fr_auto] gap-4 items-center">
                <checkbox v-model="item.completed" />
                <p :class="{ 'line-through': item.completed }">
                    {{ item.text }}
                </p>
                <icon-cross class="cursor-pointer" @click="removeTodoItem(item.id)" />

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import Checkbox from '@/components/Checkbox.vue';
import IconCross from '@/components/icons/IconCross.vue';

const todoStore = useTodoStore();
const list = computed(() => todoStore.todoList);

const removeTodoItem = (id: number) => {
    todoStore.deleteTodoItem(id);
}

</script>
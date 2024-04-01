<template>
    <div
        class="grid justify-between grid-cols-[auto_1fr] gap-4 px-6 py-4 text-sm bg-white rounded-md dark:text-white dark:bg-slate-800">
        <checkbox v-model="todoItem.completed" />
        <input v-model="todoItem.text" type="text" placeholder="Create a new todo..." @keyup.enter="submit"
            class="outline-none dark:bg-slate-800">
    </div>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';

interface TodoItem {
    id: number,
    text: string,
    completed: boolean
}

const todoStore = useTodoStore();
const todoItem: Ref<TodoItem> = ref({
    id: 1,
    text: '',
    completed: false
})
const id: Ref<number> = ref(todoItem.value.id);

const submit = () => {
    if (todoItem.value.text.trim() !== '') {
        todoStore.addTodoItem({
            id: id.value++,
            text: todoItem.value.text,
            completed: todoItem.value.completed
        });

        todoItem.value.text = '';
    }
}

</script>
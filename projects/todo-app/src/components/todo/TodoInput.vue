<template>
    <div
        class="grid justify-between w-full grid-cols-[auto_1fr] gap-4 px-6 py-4 bg-white rounded-md dark:text-white dark:bg-slate-800">
        <checkbox v-model="todoItem.completed" />
        <input v-model.trim="todoItem.text" type="text" placeholder="Create a new todo..." @keyup.enter="submit"
            class="outline-none dark:bg-slate-800">
    </div>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { computed, onMounted, ref, type Ref, watch } from 'vue';
import Checkbox from '@/components/Checkbox.vue';

const todoStore = useTodoStore();
const todoItem: Ref<TodoItem> = ref({
    id: 1,
    text: '',
    completed: false
})

const list = computed(() => todoStore.todoList);
const lastItem = computed(() => list.value.slice(-1)[0]);
const submit = () => {

    if (todoItem.value.text !== '') {
        todoStore.addTodoItem({
            id: lastItem.value.id++,
            text: todoItem.value.text,
            completed: todoItem.value.completed
        });

        todoItem.value.text = '';
    }
};

onMounted(async () => {
    getTodoList();
});

const getTodoList = async () => {
    await todoStore.getTodoItems();
};

</script>
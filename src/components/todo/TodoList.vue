<template>
    <div class="mb-6 bg-white rounded-md shadow-xl dark:bg-slate-800 dark:text-white">
        <div class="px-6 py-4 border border-gray-200 border-solid dark:border-gray-700 dark:border first:rounded-t-md last:rounded-b-md"
            v-for="(item, index) in list" draggable="true" @dragstart="startDrag($event, index)"
            @drop="onDrop($event, index)" @dragover.prevent @dragenter.prevent :key="item.id">
            <div class="grid justify-between grid-cols-[auto_auto_1fr_auto] gap-4 items-center">
                <icon-drag class="cursor-pointer" />
                <checkbox v-model="item.completed" />
                <p :class="{ 'line-through': item.completed }">
                    {{ item.text }}
                </p>
                <icon-cross class="cursor-pointer" @click="removeTodoItem(item.id)" />
            </div>
        </div>
        <div class="">HI</div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import axios from 'axios';
import { useTodoStore } from '@/stores/todo';
import Checkbox from '@/components/Checkbox.vue';
import IconCross from '@/components/icons/IconCross.vue';
import IconDrag from '@/components/icons/IconDrag.vue';

const todoStore = useTodoStore();
const list = computed(() => todoStore.todoList);
const todoList: Ref<Array<TodoItem>> = ref([]);

interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
    priority: string;
}


const startDrag = ((event: DragEvent, index: number) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('itemIndex', String(index));
    }
});

const onDrop = ((event: DragEvent, targetIndex: number) => {
    if (event.dataTransfer) {
        const startIndex = parseInt(event.dataTransfer.getData('itemIndex'));
        const draggedItem = list.value.splice(startIndex, 1)[0];
        list.value.splice(targetIndex, 0, draggedItem);
    }
})

const removeTodoItem = (id: number) => {
    todoStore.deleteTodoItem(id);
}

const getTodoItems = async () => {
    try {
        const todoResponse = await axios.get<ApiTodo[]>('https://dummyapi.online/api/todos');
        const mapTodos = todoResponse.data.map(todo => ({
            id: todo.id,
            text: todo.title,
            completed: todo.completed,
            priority: todo.priority,
        }));
        todoList.value = mapTodos;
        list.value.push(...todoList.value);
    } catch (error) {
        console.error('Error fetching todo items:', error);
    }
}

onMounted(async () => {
    await getTodoItems();
});

</script>
<template>
    <div class="w-full bg-white rounded-md shadow-xl dark:bg-slate-800 dark:text-white">
        <div class="px-6 py-4 border border-gray-200 border-solid dark:border-gray-700 dark:border first:rounded-t-md last:rounded-b-md"
            v-for="(item, index) in list" draggable="true" @dragstart="startDrag($event, index)"
            @drop="onDrop($event, index)" @dragover.prevent @dragenter.prevent :key="item.id">
            <div class="grid justify-between grid-cols-[auto_auto_1fr_auto] gap-4 items-center">
                <icon-drag class="cursor-pointer" />
                <checkbox v-model="item.completed" />
                <div>
                    <p :class="{ 'line-through': item.completed }">
                        {{ item.text }}
                    </p>
                    <!-- <textarea v-model="item.text" placeholder="Create a new todo..."
                class="w-full outline-none resize-none dark:bg-slate-800" rows="1" ref="todoTextarea" /> -->
                    <img v-if="item.imagePath" :src="item.imagePath" alt="Uploaded image"
                        class="object-contain max-w-full mt-2 border rounded-md" />
                </div>
                <icon-cross class="cursor-pointer dark:fill-white" @click="removeTodoItem(item.id)" />
            </div>
        </div>
        <div class="flex justify-between px-6 py-4 text-gray-400">
            <span>{{ numberOfUncompletedItems }} uncompleted items</span>
            <todo-filters v-if="!deviceStore.mobile" />
            <span class="ml-auto cursor-pointer sm:ml-0 dark:hover:text-white hover:text-black"
                @click="removeCompletedItems">Clear
                Completed</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { useDeviceStore } from '@/stores/device';
import Checkbox from '@/components/Checkbox.vue';
import IconCross from '@/components/icons/IconCross.vue';
import IconDrag from '@/components/icons/IconDrag.vue';
import TodoFilters from '@/components/todo/TodoFilters.vue';

const todoStore = useTodoStore();
const deviceStore = useDeviceStore();

const list = computed(() => todoStore.filteredList);

const numberOfUncompletedItems = computed(() => {
    return todoStore.getUncompletedItems.length;
});

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

const removeCompletedItems = () => {
    todoStore.deleteCompletedItems();
}

const getTodoItems = async () => {
    todoStore.getTodoItems();
}

onMounted(async () => {
    await getTodoItems();
});

</script>
<template>
    <div class="w-full bg-white rounded-md shadow-xl dark:bg-slate-800 dark:text-white">
        <div class="px-6 py-4 transition-all duration-200 ease-in-out border border-gray-200 border-solid dark:border-gray-700 dark:border first:rounded-t-md last:rounded-b-md"
            v-for="(item, index) in list" draggable="true" @dragstart="startDrag($event, index)" @dragend="onDragEnd"
            :key="item.id" @drop="onDrop($event, index)" @dragover.prevent @dragenter.prevent="onDragEnter(index)"
            @dragleave="onDragLeave(index)" :class="[
                draggingIndex === index ? 'opacity-50 scale-[0.8]' : '',
                dragOverIndex === index && draggingIndex !== index ? 'ring-2 ring-blue-400' : ''
            ]">
            <div class="grid justify-between grid-cols-[auto_auto_1fr_auto] gap-4 items-center">
                <button type="button" aria-label="Drag todo item" title="Drag todo item">
                    <icon-drag class="cursor-pointer" />
                </button>
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
                <button type="button" aria-label="Remove todo item" title="Remove todo item"
                    @click="removeTodoItem(item.id)" class="p-4 rounded-full cursor-pointer">
                    <icon-cross class=" dark:fill-white" />
                </button>
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
import { computed, onMounted, ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { useDeviceStore } from '@/stores/device';
import Checkbox from '@/components/Checkbox.vue';
import IconCross from '@/components/icons/IconCross.vue';
import IconDrag from '@/components/icons/IconDrag.vue';
import TodoFilters from '@/components/todo/TodoFilters.vue';

const todoStore = useTodoStore();
const deviceStore = useDeviceStore();

const dragOverMap = ref<{ [key: number]: number }>({});
const draggingIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

const list = computed(() => todoStore.filteredList);

const numberOfUncompletedItems = computed(() => {
    return todoStore.getUncompletedItems.length;
});

const startDrag = ((event: DragEvent, index: number) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('itemIndex', String(index));
        draggingIndex.value = index;
    }
});

const onDragEnter = (index: number) => {
    dragOverMap.value[index] = (dragOverMap.value[index] || 0) + 1;
    dragOverIndex.value = index;
};

const onDragLeave = (index: number) => {
    dragOverMap.value[index] = (dragOverMap.value[index] || 0) - 1;
    if (dragOverMap.value[index] <= 0) {
        dragOverMap.value[index] = 0;
        if (dragOverIndex.value === index) {
            dragOverIndex.value = null;
        }
    }
};

const onDragEnd = () => {
    draggingIndex.value = null;
    dragOverIndex.value = null;
};

const onDrop = ((event: DragEvent, targetIndex: number) => {
    if (event.dataTransfer) {
        const startIndex = parseInt(event.dataTransfer.getData('itemIndex'));
        const draggedItem = list.value.splice(startIndex, 1)[0];
        list.value.splice(targetIndex, 0, draggedItem);

        onDragEnd();
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
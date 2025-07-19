<template>
    <div
        class="grid justify-between w-full grid-cols-[auto_1fr_auto] gap-4 px-6 py-4 bg-white rounded-md dark:text-white dark:bg-slate-800">
        <checkbox v-model="todoItem.completed" />
        <div class="grid w-full grid-rows-[1fr_auto]">
            <textarea v-model="todoItem.text" placeholder="Create a new todo..."
                class="w-full outline-none resize-none dark:bg-slate-800" rows="1" ref="todoTextarea" />
            <div class="relative mt-2" v-if="uploadedImage.previewUrl">
                <img :src="uploadedImage.previewUrl" alt="Uploaded image" class="object-contain max-w-full" />
                <div @click="removeImageUpload"
                    class="absolute flex items-center justify-center p-4 rounded-full cursor-pointer bg-slate-800/50 top-2 right-2 backdrop-blur-md hover:bg-slate-800/20">
                    <IconCross class="w-3 h-3 stroke-white fill-black dark:fill-white hover:text-blue-500" />
                </div>
            </div>
        </div>
        <div class="flex gap-2">
            <div>
                <input id="image-upload" type="file" accept="image/*" @change="handleImageUpload" class="hidden"
                    ref="imageInput" />
                <button type="button" class="flex items-center cursor-pointer" aria-label="Upload image"
                    title="Upload image" @click="triggerImageUpload">
                    <IconImage class="w-6 h-6 text-gray-500 fill-black dark:fill-white hover:text-blue-500" />
                    <span class="sr-only">Upload image</span>
                </button>
            </div>
            <div>
                <button type="button" class="flex items-center cursor-pointer" aria-label="Submit todo"
                    title="Submit todo" @click="submit">
                    <IconSend class="w-6 h-6 text-gray-500 fill-black dark:fill-white hover:text-blue-500" />
                    <span class="sr-only">Submit todo</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref, watch } from 'vue';
import { useTodoStore } from '@/stores/todo';
import Checkbox from '@/components/Checkbox.vue';
import IconImage from '@/components/icons/IconImage.vue';
import IconSend from '@/components/icons/IconSend.vue';
import IconCross from '@/components/icons/IconCross.vue';

// --- Refs and State ---
const todoStore = useTodoStore();
const todoItem: Ref<TodoItem> = ref({
    id: 1,
    text: '',
    imagePath: '',
    completed: false
});

const todoTextarea = ref<HTMLTextAreaElement | null>(null);
const imageInput = ref<HTMLInputElement | null>(null);

const uploadedImage = ref<{
    file: File | null;
    previewUrl: string | null;
}>({
    file: null,
    previewUrl: null,
});

// --- Computed ---
const list = computed(() => todoStore.todoList);
const lastItem = computed(() => list.value.slice(-1)[0]);

// --- Methods ---
const getTodoList = async () => {
    await todoStore.getTodoItems();
};

const getImagePreview = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const handleImageUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && file.type.startsWith('image/')) {
        const previewUrl = await getImagePreview(file);
        uploadedImage.value = { file, previewUrl };
        todoItem.value.imagePath = previewUrl;
    }
};

const triggerImageUpload = () => {
    imageInput.value?.click();
};

const removeImageUpload = () => {
    uploadedImage.value = { file: null, previewUrl: null };
    todoItem.value.imagePath = '';

    if (imageInput.value) {
        imageInput.value.value = ''; // Clear the actual file input
    }
};

const autoResize = (value: string) => {
    const el = todoTextarea.value;
    if (el) {
        if (value === '') {
            el.style.height = '';
        } else {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        }
    }
};

const submit = () => {
    if (todoItem.value.text !== '' || uploadedImage.value.file) {
        todoStore.addTodoItem({
            text: todoItem.value.text,
            imagePath: uploadedImage.value.previewUrl || null,
            completed: todoItem.value.completed
        });
        todoItem.value.text = '';
        removeImageUpload();
    }

};

// --- Lifecycle ---
onMounted(async () => {
    getTodoList();
});

// --- Watchers ---
watch(() => todoItem.value.text, (newVal) => {
    autoResize(newVal);
});
</script>
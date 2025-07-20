<template>
    <div class="grid justify-between w-full grid-cols-[auto_1fr_auto] gap-4 px-6 py-4 bg-white rounded-md dark:text-white dark:bg-slate-800"
        :class="[isTextareaFocused ? 'ring-2 ring-blue-400' : 'ring-0']">
        <checkbox v-model="todoItem.completed" />
        <div class="grid w-full grid-rows-[1fr_auto]">
            <textarea v-model="todoItem.text" autofocus placeholder="Create a new todo..."
                class="w-full outline-none resize-none dark:bg-slate-800" rows="1" ref="todoTextarea" @focus="onFocus"
                @blur="onBlur" />
            <div class="relative w-full mt-2 max-w-60" v-if="uploadedImage.previewUrl">
                <img :src="uploadedImage.previewUrl" :class="['object-cover w-full', imageAspectClass]"
                    class="rounded-md" alt="Uploaded image" @load="onImageLoad" />
                <button type="button" aria-label="Remove image" title="Remove image" @click="removeImageUpload"
                    class="absolute flex items-center justify-center p-4 rounded-full cursor-pointer top-2 right-2 bg-slate-800/50 backdrop-blur-md hover:bg-slate-800/20">
                    <IconCross class="w-3 h-3 stroke-white fill-black dark:fill-white hover:text-blue-500" />
                </button>
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
import { onMounted, ref, type Ref, watch } from 'vue';
import { useTodoStore } from '@/stores/todo';
import Checkbox from '@/components/Checkbox.vue';
import IconImage from '@/components/icons/IconImage.vue';
import IconSend from '@/components/icons/IconSend.vue';
import IconCross from '@/components/icons/IconCross.vue';
import { useFocus } from '@/composables/useFocus';
import { fileToBase64 } from '@/utils/use-files';

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

const imageAspectClass = ref<string | null>('');

// --- Methods ---
const getTodoList = async () => {
    await todoStore.getTodoItems();
};

const { isFocused: isTextareaFocused, onFocus, onBlur } = useFocus();

const handleImageUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    imageAspectClass.value = '';

    const previewUrl = await fileToBase64(file);

    uploadedImage.value = {
        file,
        previewUrl // This is a 'data:image/...;base64,...' string
    };
};

// Calculate aspect ratio after image is loaded
const onImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const aspect = img.naturalWidth / img.naturalHeight;

    imageAspectClass.value = aspect > 1.1
        ? 'aspect-video'
        : 'aspect-[2/3]'; // Adjust as needed for portrait images
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
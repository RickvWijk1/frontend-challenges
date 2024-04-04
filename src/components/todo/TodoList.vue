<template>
    <div class="bg-white rounded-md shadow-xl dark:bg-slate-800 dark:text-white">
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
        <div v-for="movie in movieList" :key="movie.id">
            {{ movie.name }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import axios from 'axios'
import { useTodoStore } from '@/stores/todo';
import Checkbox from '@/components/Checkbox.vue';
import IconCross from '@/components/icons/IconCross.vue';
import IconDrag from '@/components/icons/IconDrag.vue';


interface ExpectMovie {
    id: number;
    movie: string;
    rating: number;
    image: string;
    imdb_url: string;
}

const todoStore = useTodoStore();
const list = computed(() => todoStore.todoList);
const movieList: Ref<Array<Movie>> = ref([]);


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

const getMovies = async () => {
    try {
        const moviesResponse = await axios.get<ExpectMovie[]>('https://dummyapi.online/api/movies');
        const mapMovies = moviesResponse.data.map(movie => ({
            id: movie.id,
            name: movie.movie,
            rating: movie.rating,
            image: movie.image,
            imdb_url: movie.imdb_url
        }));
        movieList.value = mapMovies;

    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

onMounted(async () => {
   await getMovies();
});

</script>
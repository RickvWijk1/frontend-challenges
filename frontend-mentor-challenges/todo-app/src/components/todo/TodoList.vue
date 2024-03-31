<template>
    <div class="bg-white rounded-md shadow-xl dark:bg-slate-800 dark:text-white">
        <div class="p-4 border border-gray-200 border-solid dark:border-gray-700 dark:border first:rounded-t-md last:rounded-b-md"
            v-for="(item, index) in list">
            <div class="grid justify-between grid-cols-[auto_auto_auto]">
                <div class="">✔</div>
                <div>
                    {{ item }}
                </div>
                <div class="">X</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const list = ref(['1', '2', '3', '4', '5', '6']);
</script>
<template>
    <div class="grid justify-between grid-cols-[1fr_auto] bg-transparent items-center">
        <h1 class="text-4xl font-bold tracking-wider text-white">TODO</h1>
        <component :is="switchTheme" @click="themeStore.toggleTheme" class="cursor-pointer" />
    </div>

</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

const switchTheme = computed(() => {
    if (themeStore.showDarkTheme) {
        return defineAsyncComponent(() => import('@/components/icons/IconMoon.vue'));
    }

    return defineAsyncComponent(() => import('@/components/icons/IconSun.vue'));
});
</script>
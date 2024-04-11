<template>
    <div :class="[themeStore.showDarkTheme ? 'bg-hero-img-dark' : 'bg-hero-img-light']"
        class="w-full bg-no-repeat bg-cover h-60 l bg-hero-img absolute inset-0"></div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

</script>
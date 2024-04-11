<template>
    <div :class="[themeStore.showDarkTheme ? 'bg-mobile-hero-img-dark sm:bg-desktop-hero-img-dark' : 'bg-mobile-hero-img-light sm:bg-desktop-hero-img-light']"
        class="absolute inset-0 w-full bg-no-repeat bg-cover h-60 l bg-hero-img"></div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

</script>
<template>
    <router-view :class="{ dark: themeStore.showDarkTheme }"></router-view>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>
<style lang="css">
#app {
    height: 100%;
    background-color: #f9f9f9;
}

html,
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>
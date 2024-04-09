<template>
    <router-view :class="{ dark: themeStore.showDarkTheme }"></router-view>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const themeStore = useThemeStore();
const bgColors = computed(() => themeStore.showDarkTheme ? '#f9f9f9' : '#161722');
console.log(bgColors.value)
</script>
<style lang="css">
#app {
    height: 100%;
    background-color: v-bind(bgColors);
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
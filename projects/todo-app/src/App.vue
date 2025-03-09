<template>
    <router-view></router-view>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
html {
    height: 100%;

    &.dark {
        body {
            background-color: #161722;
        }
    }
}

body {
    min-height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #f9f9f9;

    #app {
        height: 100%;
    }
}
</style>
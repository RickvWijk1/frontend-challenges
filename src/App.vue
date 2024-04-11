<template>
    <router-view></router-view>
    <div id="attribution" style="display: flex; flex-direction: column; align-items: center; padding: 1rem 0; width: 100%;">
        <div class="atrribution-section">
        Challenge by 
            <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        </div>
        <div class="atrribution-section">
        Coded by 
            <a style="font-weight: bold;" href="https://rickvwijk1.github.io/rvwijk_portfolio">Rick van Wijk</a>.
        </div>
    </div>
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
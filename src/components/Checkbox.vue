<template>
  <div class="relative flex items-center justify-center cursor-pointer">
    <input type="checkbox" v-model="checked"
      class="transition-all bg-transparent border-2 border-gray-300 rounded-full appearance-none cursor-pointer dark:border-gray-600 w-7 h-7 peer bg-gradient-to-br checked:border-none checked:from-gradient-blue checked:to-gradient-purple" />
    <icon-check class="absolute hidden text-white pointer-events-none peer-checked:flex" />
  </div>
</template>
<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue';

const checked = defineModel()

</script>
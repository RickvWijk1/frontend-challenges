<template>
  <label class="relative flex items-center justify-center p-4 cursor-pointer">
    <input type="checkbox" v-model="checked" aria-label="Check or uncheck todo item"
      :title="checked ? 'Uncheck todo item' : 'Complete todo item'"
      class="w-8 h-8 transition-all bg-transparent border-2 border-gray-300 rounded-full appearance-none cursor-pointer dark:border-gray-600 peer bg-gradient-to-br checked:border-none checked:from-gradient-blue checked:to-gradient-purple" />
    <icon-check class="absolute hidden text-white pointer-events-none peer-checked:flex" />
  </label>
</template>
<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue';

const checked = defineModel()

</script>
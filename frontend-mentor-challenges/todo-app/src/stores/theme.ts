import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core';

const isDark = useDark({
  selector: 'html',
});

export const useThemeStore = defineStore('theme', () => {

   const showDarkTheme = ref(isDark);

   const toggleTheme = () => showDarkTheme.value = !showDarkTheme.value;

    return { 
      showDarkTheme,
      toggleTheme
    }
});

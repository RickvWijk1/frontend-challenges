import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', () => {
    const isMobile = ref<boolean>(true);

    const getViewportWidth = computed(() => window.innerWidth);

    const mobile = computed(() => {
        if (getViewportWidth.value >= 650){
           return false;
        }
        return true;
    })

    return {
        isMobile,
        getViewportWidth,
        mobile
    }
});
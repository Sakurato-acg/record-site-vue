<script setup>
import { ref, computed } from 'vue'
import { useLayoutStore } from '../../stores/index'
const layoutStore = useLayoutStore()

const hidden = computed(() => {
  // console.log('1' + layoutStore.menu.hidden)
  return layoutStore.menu.hidden
})

const close = () => {
  // console.log('2' + layoutStore.menu.hidden)
  layoutStore.changeMenuHidden()
}
</script>
<template>
  <div :class="{ bg: true, bgHidden: hidden }" @click="close()"></div>
</template>

<style>
@media screen and (max-width: 766px) {
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    height: 100vh;
    width: 100vw;
    --tw-bg-opacity: 1;
    background-color: rgb(75 85 99 / var(--tw-bg-opacity));
    opacity: 0.75;
  }
  .bgHidden {
    display: none;
  }
}
</style>

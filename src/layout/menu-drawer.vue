<template>
  <q-list class="text-[#3F3F3F]">
    <menu-drawer-btn
      :to="getRoute('home')"
      icon="home"
      label="首頁"
    />
    <q-separator />

    <menu-drawer-btn
      :to="getRoute('btn-naughty')"
      label="調皮的按鈕"
    />
    <menu-drawer-btn
      :to="getRoute('cursor-sandevistan')"
      label="安裝沙德威斯坦的鼠標"
    />
    <menu-drawer-btn
      :to="getRoute('wrapper-3d-like')"
      label="類 3D 包裝器"
    />
  </q-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouteName } from '../router/router';

import MenuDrawerBtn from './menu-drawer-btn.vue';

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function getRoute(name: `${RouteName}`) {
  return { name }
}
</script>

<style scoped lang="sass">
</style>

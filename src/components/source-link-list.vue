<template>
  <div class="flex">
    <div
      v-for="item, i of list"
      :key="item.href"
    >
      <span v-if="i !== 0">、</span>

      <a
        :href="item.href"
        target="_blank"
        class=" link"
      >
        {{ item.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  name: string;
}
const props = withDefaults(defineProps<Props>(), {});

const list = computed(() => [
  {
    label: '元件',
    href: `https://gitlab.com/side_project/chill-component/-/tree/main/src/components/${props.name}`,
  },
  {
    label: '範例',
    href: `https://gitlab.com/side_project/chill-component/-/tree/main/src/components/${props.name}/examples`,
  },
]);
</script>

<style scoped lang="sass">
.link
  color: #29bfff
  font-weight: 600 !important
</style>

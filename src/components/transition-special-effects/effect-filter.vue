<template>
  <svg class="hidden">
    <defs>
      <suspense v-if="filterComponent">
        <component
          :is="filterComponent"
          :id="props.filterId"
          ref="filterRef"
        />
      </suspense>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import type { FilterExpose } from './type'
import { until } from '@vueuse/core'
import { entries, find, map, pipe } from 'remeda'
import { computed, defineAsyncComponent, ref } from 'vue'
import { TransitionName } from './type'

interface Props {
  filterId: string;
  name: `${TransitionName}`;
}
const props = withDefaults(defineProps<Props>(), {})

const filterList = Object.values(TransitionName)
// 引入所有 filter 元件
const filterModules = import.meta.glob(['./filters/*.vue'])
const filterComponentList = pipe(
  filterModules,
  entries(),
  map(([path, component]) => {
    const text = path.match(/\.\/filters\/(.+)\.vue/)?.[1]
    if (!text) {
      throw new Error(`Invalid path: ${path}`)
    }
    const name = text.replace('filter-', '')
    if (!filterList.includes(name as TransitionName)) {
      throw new Error(`元件命名錯誤: ${path}`)
    }

    return {
      name,
      component: defineAsyncComponent(component as Parameters<typeof defineAsyncComponent>[0]),
    }
  }),
)
const filterComponent = computed(() => pipe(
  filterComponentList,
  find(({ name }) => name === props.name),
  (target) => {
    if (!target) {
      throw new Error(`找不到 ${props.name} filter 元件`)
    }

    return target.component
  },
))

const filterRef = ref<FilterExpose>()

defineExpose<FilterExpose>({
  enter: async (params) => {
    await until(filterRef).toBeTruthy()
    return filterRef.value?.enter(params)
  },
  leave: async (params) => {
    await until(filterRef).toBeTruthy()
    return filterRef.value?.leave(params)
  },
})
</script>

<style scoped lang="sass">
</style>

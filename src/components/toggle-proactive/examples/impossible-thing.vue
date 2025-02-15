<template>
  <div class="w-full flex-center border border-gray-300 p-6">
    <div class="flex flex-col gap-4">
      <div
        v-for="state in stateList"
        :key="state.label"
        class="flex items-center justify-end gap-4"
      >
        <div class="text-xl">
          {{ state.label }}
        </div>

        <toggle-proactive
          ref="toggleRefList"
          v-model="state.value"
          size="3rem"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pipe, reduce, sample } from 'remeda'
import { computed, ref, watch } from 'vue'
import ToggleProactive from '../toggle-proactive.vue'

interface State {
  value: boolean;
  label: string;
}

type Toggle = InstanceType<typeof ToggleProactive>

const toggleRefList = ref<[Toggle, Toggle, Toggle]>()

const stateList = ref<[State, State, State]>([
  { value: false, label: '要快' },
  { value: false, label: '要好' },
  { value: false, label: '要便宜' },
])
const booleanList = computed(
  () => stateList.value.map((state) => state.value),
)

watch(booleanList, (value, oldValue) => {
  const allTrue = value.every((v) => v)
  if (!allTrue) {
    return
  }

  /** 排除最後一個切換的開關 */
  const targetIndex = pipe(
    oldValue,
    reduce(
      (acc: number[], boolValue, i) => boolValue ? [...acc, i] : acc,
      [],
    ),
    sample(1),
    ([i]) => i ?? 0,
  )

  toggleRefList.value?.[targetIndex]?.toggle()
})
</script>

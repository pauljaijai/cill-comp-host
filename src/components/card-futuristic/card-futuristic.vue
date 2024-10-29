<template>
  <div class="relative">
    <card-border class="pointer-events-none absolute" />

    <div
      ref="bodyRef"
      class="box-content p-4"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { computed, provide, reactive, ref, watch } from 'vue'
import CardBorder from './card-border.vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  visible?: boolean;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  visible: true,
})

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [];
}>()
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>()
// #endregion Slots

const bodyRef = ref<HTMLDivElement>()
const bodySize = reactive(useElementSize(bodyRef, undefined, {
  box: 'border-box',
}))

watch(() => prop.visible, (value) => {
  if (value) {
    anime({
      targets: bodyRef.value,
      opacity: [
        0,
        0.6,
        0.1,
        0.8,
        0.3,
        1,
      ],
      duration: 300,
    })
  }
  else {
    anime({
      targets: bodyRef.value,
      opacity: [
        1,
        0.6,
        0.1,
        0.8,
        0.3,
        0,
      ],
      duration: 300,
    })
  }
})

provide(PROVIDE_KEY, {
  bodySize: computed(() => ({
    width: bodySize.width,
    height: bodySize.height,
  })),
})
</script>

<style scoped lang="sass">
</style>

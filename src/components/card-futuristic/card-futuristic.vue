<template>
  <div class="relative">
    <card-bg class="pointer-events-none absolute z-[-1]" />
    <card-border class="pointer-events-none absolute z-[-1]" />
    <card-corner class="pointer-events-none absolute z-[-1]" />

    <div
      ref="bodyRef"
      class="z-0"
      :class="prop.bodyClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import anime from 'animejs'
import { computed, provide, reactive, ref, watch } from 'vue'
import CardBg from './card-bg.vue'
import CardBorder from './card-border.vue'
import CardCorner from './card-corner.vue'
import { PROVIDE_KEY } from './type'

// #region Props
interface Props {
  visible?: boolean;
  bodyClass?: string;
}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
  visible: true,
  bodyClass: 'p-4',
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
        0.1,
        0.8,
        0.3,
        1,
      ],
      duration: 200,
      delay: 600,
      easing: 'linear',
    })
  }
  else {
    anime({
      targets: bodyRef.value,
      opacity: [
        1,
        0.6,
        0.1,
        0.3,
        0,
      ],
      duration: 200,
      delay: 300,
      easing: 'linear',
    })
  }
})

provide(PROVIDE_KEY, {
  visible: computed(() => prop.visible),
  bodySize: computed(() => ({
    width: bodySize.width,
    height: bodySize.height,
  })),
})
</script>

<style scoped lang="sass">
</style>

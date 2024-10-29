<template>
  <div class="relative border">
    <div
      ref="bodyRef"
      class="body"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs'
import { onMounted, ref } from 'vue'

// #region Props
interface Props {

}
// #endregion Props
const prop = withDefaults(defineProps<Props>(), {
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

onMounted(() => {
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
})
</script>

<style scoped lang="sass">
</style>

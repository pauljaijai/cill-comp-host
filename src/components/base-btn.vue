<template>
  <button
    class="base-btn"
    :class="classes"
    type="button"
    :aria-disabled="props.disabled"
    @click="handleClick()"
  >
    <slot>
      {{ props.label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  disabled?: boolean;
  /** 停用時要不要忽略 click 事件 */
  ignoreClick?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
  ignoreClick: false,
});

const emit = defineEmits<{
  'click': [];
}>();

const classes = computed(() => {
  const result: string[] = [];

  if (props.disabled) {
    result.push('!cursor-not-allowed');
  } else {
    result.push('cursor-pointer');
  }

  return result;
});

function handleClick() {
  if (props.ignoreClick && props.disabled) return;

  emit('click')
}
</script>

<style scoped lang="sass">
.base-btn
  padding: 0.5rem 1.5rem
  border: 1px solid #777
  border-radius: 0.25rem
  background-color: #FEFEFE
  transition: background-color 0.1s, scale 0.4s
  scale: 1
  &:active
    background-color: #F0F0F0
    transition: scale 0.01s
    scale: 0.995
</style>

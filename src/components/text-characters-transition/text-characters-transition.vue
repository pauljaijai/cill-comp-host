<template>
  <component
    :is="props.tag"
    :aria-label="labelText"
  >
    <span
      v-for="char, i in chars"
      :key="i"
      aria-hidden
      :class="targetClass"
      class="inline-block"
    >
      {{ char.value }}
    </span>
  </component>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { nanoid } from 'nanoid';
import { isNullish, map, pipe } from 'remeda';
import { computed, onMounted, ref, watch } from 'vue';

// #region Props
interface Props {
  visible?: boolean;
  label: string;
  /** html tag
   * 
   * @default 'p'
   */
  tag?: string;
  /** 如何切割文字
   * 
   * @default /.*?/u
   */
  splitter?: RegExp | ((label: string) => string[]);
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  visible: true,
  label: '',
  tag: 'p',
  splitter: undefined,
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [];
}>();
// #endregion Emits

const targetClass = nanoid();
const labelText = computed(() => props.label);

const chars = computed(() => pipe(
  props.label,
  (label) => {
    if (typeof props.splitter === 'function') {
      return props.splitter(label);
    }

    return label.split(props.splitter ?? /.*?/u);
  },
  map((char) => {
    return {
      value: char,
    }
  })
));

async function enter() {
  anime({
    targets: `.${targetClass}`,
    opacity: [0, 1],
    translateX: () => [
      anime.random(20, -20),
      0,
    ],
    translateY: () => [
      anime.random(20, -20),
      0,
    ],
    filter: ['blur(10px)', 'blur(0px)'],
    delay(el, i) {
      return i * 100;
    },
    easing: 'easeOutCirc',
  });
}

async function leave(duration?: number) {
  if (!isNullish(duration)) {
    anime({
      targets: `.${targetClass}`,
      opacity: [1, 0],
      duration,
      delay(el, i) {
        return i * 100;
      }
    });
    return;
  }

  anime({
    targets: `.${targetClass}`,
    opacity: [1, 0],
    delay(el, i) {
      return i * 100;
    }
  });
}

watch(() => props.visible, (visible) => {
  visible ? enter() : leave()
});


onMounted(() => {
  if (!props.visible) {
    leave(0);
  }
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

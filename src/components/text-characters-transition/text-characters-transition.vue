<template>
  <component
    :is="props.tag"
    :aria-label="labelText"
  >
    <span
      v-for="char, i in chars"
      :key="i"
      aria-hidden
      :id="char.id"
      class="inline-block"
    >
      {{ char.value }}
    </span>
  </component>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { nanoid } from 'nanoid';
import { identity, isNullish, join, map, pipe, range, times } from 'remeda';
import { computed, onMounted, ref, watch, CSSProperties } from 'vue';

type AnimeFuncParam = (
  index: number,
  /** 動畫總數 */
  length: number,
) => anime.AnimeParams;

// #region Props
interface Props {
  visible?: boolean;
  label: string | string[] | Array<{
    value: string;
    enter: AnimeFuncParam;
    leave: AnimeFuncParam;
  }>;
  /** html tag
   * 
   * @default 'p'
   */
  tag?: string;
  /** 如何切割文字
   * 
   * 只有在 label 為 string 時有效
   * 
   * @default /.*?/u
   */
  splitter?: RegExp | ((label: string) => string[]);

  enter?: AnimeFuncParam;
  leave?: AnimeFuncParam;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  visible: true,
  label: '',
  tag: 'p',
  splitter: undefined,

  enter: (i, length) => ({
    opacity: [0, 1],
    delay: i * 50,
  } satisfies anime.AnimeParams),

  leave: (i, length) => ({
    opacity: [1, 0],
    delay: i * 50,
  } satisfies anime.AnimeParams),
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [];
}>();
// #endregion Emits

const id = nanoid();

const chars = computed(() => pipe(
  props.label,
  (data) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (typeof props.splitter === 'function') {
      return props.splitter(data);
    }

    /** Regex 加上 u 才不會導致 emoji 被拆分成亂碼 */
    return data.split(props.splitter ?? /.*?/u);
  },
  map.strict.indexed((data, i, array) => {
    const idName = `${id}-${i}`;

    if (typeof data === 'string') {
      return {
        value: data,
        id: idName,
        i,
        enter: () => props.enter(i, array.length),
        leave: () => props.leave(i, array.length),
      }
    }

    return {
      ...data,
      id: idName,
      i,
    }
  })
));

const labelText = computed(() => pipe(
  chars.value,
  map((char) => char.value),
  join(''),
));

async function startEnter() {
  chars.value.forEach((char) => {
    const data = char.enter(char.i, chars.value.length);
    anime({
      ...data,
      targets: `#${char.id}`,
    });
  });

  // anime({
  //   targets: target,
  //   opacity: [0, 1],
  //   translateX: () => [
  //     anime.random(-30, -10),
  //     0,
  //   ],
  //   translateY: () => [
  //     anime.random(-20, 20),
  //     0,
  //   ],
  //   rotate: () => [
  //     anime.random(-30, 30),
  //     0,
  //   ],
  //   filter: ['blur(10px)', 'blur(0px)'],
  //   delay: (el, i) => i * 100,
  //   easing: 'easeOutCirc',
  // });
}

async function startLeave(duration?: number) {
  if (!isNullish(duration)) {
    chars.value.forEach((char) => {
      anime({
        ...char.leave(char.i, chars.value.length),
        duration,
        targets: `#${char.id}`,
      });
    });
    return;
  }

  chars.value.forEach((char) => {
    anime({
      ...char.leave(char.i, chars.value.length),
      targets: `#${char.id}`,
    });
  });

  // if (!isNullish(duration)) {
  //   anime({
  //     targets: target,
  //     opacity: [1, 0],
  //     duration,
  //     delay: (el, i) => i * 50,
  //   });
  //   return;
  // }

  // anime({
  //   targets: target,
  //   opacity: [1, 0],
  //   delay: (el, i) => i * 50,
  // });
}

watch(() => props.visible, (visible) => {
  visible ? startEnter() : startLeave()
});


onMounted(() => {
  if (!props.visible) {
    startLeave(0);
  }
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

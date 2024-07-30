<template>
  <component
    :is="props.tag"
    :aria-label="labelText"
  >
    <span
      v-for="char, i in chars"
      :id="char.id"
      :key="i"
      :class="id"
      aria-hidden
      class="inline-block"
    >
      {{ char.value }}
    </span>
  </component>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { nanoid, customAlphabet } from 'nanoid';
import { identity, isNullish, join, map, pipe, piped, range, times } from 'remeda';
import { computed, onMounted, ref, watch, CSSProperties } from 'vue';
import { AnimeFuncParam } from './type';
import { TransitionName, transitionProvider } from './transition-provider';

// #region Props
type AnimeFuncParamWithName = anime.AnimeParams & {
  name?: `${TransitionName}`;
}

/** 可以直接給 TransitionName 或者包含 name 與其他動畫參數，用於微調動畫效果 */
type AnimeParam =
  | `${TransitionName}`
  | ((index: number, length: number) => AnimeFuncParamWithName);

interface Props {
  visible?: boolean;
  label: string | string[] | Array<{
    value: string;
    enter: AnimeParam;
    leave: AnimeParam;
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
  /** 進入動畫設定 */
  enter?: AnimeParam;
  /** 離開動畫設定 */
  leave?: AnimeParam;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  visible: true,
  label: '',
  tag: 'p',
  splitter: undefined,
  enter: undefined,
  leave: undefined,
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [];
}>();
// #endregion Emits

const id = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)();

/** 沒有指定 TransitionName 的話預設都是 fade */
function getAnimeParam(
  type: 'enter' | 'leave',
  i: number,
  length: number,
  data?: AnimeParam,
): anime.AnimeParams {
  const defaultParam = transitionProvider.fade[type](i, length);

  if (!data) return defaultParam;

  if (typeof data === 'string') {
    return transitionProvider[data][type](i, length);
  }

  const param = data(i, length);

  if (param.name) {
    const providerParam = transitionProvider[param.name][type](i, length);
    return {
      ...providerParam,
      ...param,
    }
  }

  return {
    ...defaultParam,
    ...param,
  }
}

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
        enter: () => getAnimeParam('enter', i, array.length, props.enter),
        leave: () => getAnimeParam('leave', i, array.length, props.leave),
      }
    }

    return {
      value: data.value,
      id: idName,
      i,
      enter: () => getAnimeParam('enter', i, array.length, data.enter),
      leave: () => getAnimeParam('leave', i, array.length, data.leave),
    }
  })
));

const labelText = computed(() => pipe(
  chars.value,
  map((char) => char.value),
  join(''),
));

async function startEnter(duration?: number) {
  anime.remove(`.${id}`);

  chars.value.forEach((char) => {
    const data = char.enter();

    if (!isNullish(duration)) {
      data.duration = duration;
    }

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
  anime.remove(`.${id}`);

  chars.value.forEach((char) => {
    const data = char.leave();

    if (!isNullish(duration)) {
      data.duration = duration;
    }

    anime({
      ...data,
      targets: `#${char.id}`,
    });
  });
}

watch(() => props.visible, (visible) => {
  visible ? startEnter() : startLeave()
});

onMounted(() => {
  props.visible ? startEnter(0) : startLeave(0)
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

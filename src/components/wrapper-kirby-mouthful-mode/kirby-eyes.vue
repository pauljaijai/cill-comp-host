<template>
  <g
    ref="gRef"
    :mask="`url(#${maskId})`"
  >
    <ellipse
      v-for="style, i in styles"
      :key="i"
      v-bind="style"
      fill="#111"
    />

    <ellipse
      v-for="style, i in ballStyles"
      :key="i"
      v-bind="style"
      fill="white"
    />
  </g>
</template>

<script setup lang="ts">
import { SVGAttributes, computed, ref } from 'vue';
import { AnimeComponent, Size, StyleMap } from './type';
import anime from 'animejs';
import { map, pipe } from 'remeda';

// #region Props
interface Props {
  size: Size;
  thickness: number;
  maskId: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {});


const size = computed(() => {
  const base = Math.min(props.size.width, props.size.height);

  return {
    rx: Math.min(base / 16, 6),
    ry: Math.min(base / 7, 15),
  }
});
const distanceFromMouth = computed(
  () => props.size.height / 14
);

/** [左, 右] */
const styles = computed<SVGAttributes[]>(() => {
  const kirbySize = props.size;

  const [cxL, cxR] = [
    kirbySize.width / 2 - size.value.rx * 2,
    kirbySize.width / 2 + size.value.rx * 2,
  ];
  const cy = kirbySize.height / 2 - size.value.ry * 2 - distanceFromMouth.value;

  return pipe(
    [cxL, cxR],
    map((cx) => ({
      ...size.value,
      cx, cy,
    }))
  )
})

const ballStyles = computed<SVGAttributes[]>(() => {
  const kirbySize = props.size;

  const rx = size.value.rx / 2;
  const ry = size.value.ry / 2.5;

  const [cxL, cxR] = [
    kirbySize.width / 2 - size.value.rx * 2,
    kirbySize.width / 2 + size.value.rx * 2,
  ];
  const cy = kirbySize.height / 2 - size.value.ry * 2 - ry - distanceFromMouth.value;

  return pipe(
    [cxL, cxR],
    map((cx) => ({
      rx, ry, cx, cy,
    }))
  )
})

const gRef = ref<SVGGElement>();
const gStyleMap = computed<StyleMap>(() => {
  const kirbySize = props.size;

  return {
    enter: {
      style: 'transform: translateY(0px)',
    },
    leave: {
      style: `transform: translateY(-${kirbySize.height / 2}px)`,
    },
  }
});

// #region Methods
defineExpose<AnimeComponent>({
  enter(param) {
    const gEl = gRef.value;
    if (!gEl) return;

    anime.remove([gEl]);

    anime({
      targets: gEl,
      ...gStyleMap.value.enter,
      ...param,
    })
  },
  leave(param) {
    const gEl = gRef.value;
    if (!gEl) return;

    anime.remove([gEl]);

    anime({
      targets: gEl,
      ...gStyleMap.value.leave,
      ...param,
    })
  },
});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

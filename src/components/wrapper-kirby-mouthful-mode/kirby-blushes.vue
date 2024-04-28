<template>
  <g
    ref="gRef"
    :mask="`url(#${maskId})`"
  >
    <ellipse
      v-bind="styles[0]"
      :fill="props.color"
    />
    <ellipse
      v-bind="styles[1]"
      :fill="props.color"
    />
  </g>
</template>

<script setup lang="ts">
import { SVGAttributes, computed, ref } from 'vue';
import { AnimeComponent, Size, StyleMap } from './type';
import { map, pipe } from 'remeda';
import anime from 'animejs';

// #region Props
interface Props {
  size: Size;
  thickness: number;
  maskId: string;
  color: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {});

/** [左, 右] */


const size = computed(() => {
  const base = Math.min(props.size.width, props.size.height);

  return {
    rx: Math.min(base / 10, 10),
    ry: Math.min(base / 16, 6),
  }
});
const distanceFromMouth = computed(
  () => props.size.height / 10
);

/** [左, 右] */
const styles = computed<SVGAttributes[]>(() => {
  const kirbySize = props.size;

  const [cxL, cxR] = [
    kirbySize.width / 2 - size.value.rx * 4,
    kirbySize.width / 2 + size.value.rx * 4,
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

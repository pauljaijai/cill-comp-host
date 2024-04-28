<template>
  <g :mask="`url(#${maskId})`">
    <ellipse
      :ref="(ref) => bindRef(ref, 0)"
      v-bind="styleMaps[0].enter"
      fill="#111"
      :mask="`url(#${maskId})`"
    />
    <ellipse
      :ref="(ref) => bindRef(ref, 1)"
      v-bind="styleMaps[1].enter"
      fill="#111"
      :mask="`url(#${maskId})`"
    />
  </g>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, computed, ref } from 'vue';
import { Size, StyleMap } from './type';

// #region Props
interface Props {
  size: Size;
  thickness: number;
  maskId: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {});

/** [左, 右] */
const refs = ref<[SVGEllipseElement?, SVGEllipseElement?]>([undefined, undefined]);
function bindRef(
  el: Element | ComponentPublicInstance | null,
  index: 0 | 1
) {
  if (el instanceof SVGEllipseElement) {
    refs.value[index] = el;
  }
}
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

const styleMaps = computed<StyleMap[]>(() => {
  const kirbySize = props.size;

  const [cxL, cxR] = [
    kirbySize.width / 2 - size.value.rx * 2,
    kirbySize.width / 2 + size.value.rx * 2,
  ];
  const enterCy = kirbySize.height / 2 - size.value.ry * 2 - distanceFromMouth.value;

  return [
    {
      enter: {
        ...size.value,
        cx: cxL,
        cy: enterCy,
      },
      leave: {
        ...size.value,
        cx: cxL,
      },
    },
    {
      enter: {
        ...size.value,
        cx: cxR,
        cy: enterCy,
      },
      leave: {
        ...size.value,
        cx: cxR,
      },
    },
  ]
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

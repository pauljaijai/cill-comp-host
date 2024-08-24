import { MaybeElementRef, toValue, useThrottleFn, useTimestamp } from "@vueuse/core";
import { computed, MaybeRefOrGetter, ref, watch } from "vue"
import { onLongPress, OnLongPressOptions } from '@vueuse/core';

interface UseLongPressTimingsParam extends Omit<
  OnLongPressOptions, 'delay'
> { }

/** 可以自定義 LongPress 多個觸發點 */
export function useLongPressTimings(
  target: MaybeElementRef,
  timings: Array<{
    delay: number;
    handler: (evt: PointerEvent) => void;
  }>,
  param?: UseLongPressTimingsParam,
) {
  timings.forEach((timing) => {
    onLongPress(target, timing.handler, {
      ...param,
      delay: timing.delay,
    });
  });
}
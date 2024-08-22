import { toValue, useThrottleFn, useTimestamp } from "@vueuse/core";
import { computed, MaybeRefOrGetter, ref, watch } from "vue"


interface UseTimerParam {
  playing: MaybeRefOrGetter<boolean>;
  /** @default 200 */
  tickInterval?: MaybeRefOrGetter<number>;
  onTick?: (time: number) => void;
}
export function useTimer(param: UseTimerParam) {
  const {
    timestamp, pause, resume,
  } = useTimestamp({
    controls: true,
    immediate: false,
  })

  watch(() => param.playing, (state) => {
    const value = toValue(state);

    if (value) {
      startedAt.value = timestamp.value
    }

    value ? resume() : pause()
  }, { deep: true })

  const startedAt = ref(timestamp.value);
  const time = computed(() => timestamp.value - startedAt.value);
  watch(time, () => throttledTick())

  const throttledTick = useThrottleFn(() => {
    param.onTick?.(time.value)
  }, param.tickInterval);

  return {
    /** 經過時間 */
    time,
  }
}
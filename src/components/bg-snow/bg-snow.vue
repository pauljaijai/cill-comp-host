<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none"
  />
</template>

<script setup lang="ts">
import type { WorkerApi } from './bg-snow-worker'
import { useEventListener } from '@vueuse/core'
import * as Comlink from 'comlink'
import { clone } from 'remeda'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { bgSnowStore as store } from './bg-snow-store'
import SceneWorker from './bg-snow-worker?worker'

// #region Props
interface Props { }
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

let worker: Worker | undefined
let remoteWorker: Comlink.Remote<WorkerApi> | undefined

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) {
    throw new Error('無法取得 canvas DOM')
  }

  if (!canvas.transferControlToOffscreen) {
    throw new Error('此瀏覽器不支援 canvas.transferControlToOffscreen')
  }

  const offscreen = canvas.transferControlToOffscreen()

  const rect = canvas.getBoundingClientRect()
  offscreen.width = rect.width
  offscreen.height = rect.height

  worker = new SceneWorker({ name: 'bg-snow' })
  remoteWorker = Comlink.wrap<WorkerApi>(worker)

  remoteWorker.init(Comlink.transfer(offscreen, [offscreen]))

  useEventListener('resize', () => {
    const rect = canvas.getBoundingClientRect()
    remoteWorker?.resize(rect)
  })
})

onBeforeUnmount(() => {
  worker?.terminate()
})

watch(() => store.staticMap, (data) => {
  remoteWorker?.setStaticMap(clone(data))
}, {
  immediate: true,
  deep: true,
})

function sweep() {
  remoteWorker?.sweep()
}

// #region Methods
defineExpose({
  /** 清除積雪 */
  sweep,
})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

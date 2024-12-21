<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none"
  />
</template>

<script setup lang="ts">
import type { WorkerApi } from './bg-snow-worker'
import * as Comlink from 'comlink'
import { onMounted, ref } from 'vue'
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

  const rect = canvas.getBoundingClientRect()

  if (!canvas.transferControlToOffscreen) {
    throw new Error('此瀏覽器不支援 canvas.transferControlToOffscreen')
  }

  const offscreen = canvas.transferControlToOffscreen()
  offscreen.width = rect.width
  offscreen.height = rect.height

  worker = new SceneWorker({ name: 'bg-snow' })
  remoteWorker = Comlink.wrap<WorkerApi>(worker)

  remoteWorker.init(Comlink.transfer(offscreen, [offscreen]))
})

// #region Methods
defineExpose({})
// #endregion Methods
</script>

<style scoped lang="sass">
</style>

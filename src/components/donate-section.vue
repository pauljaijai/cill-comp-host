<template>
  <div class="vp-doc mb-10 border rounded-xl p-4">
    如果你喜歡酷酷的元件，歡迎「
    <a
      href="https://portaly.cc/codfish/support"
      target="_blank"
    >
      請我喝一杯咖啡
    </a>

    」或花 10 秒登入 LikeCoin 按下方按鈕拍手鼓勵我喔！
    <iframe
      :key="src"
      scrolling="no"
      frameborder="0"
      :src
    />

    <div class="rounded-xl bg-slate-50 p-4 text-center text-lg text-gray-600">
      鱈魚感謝您！ <span class="text-nowrap">(´▽`ʃ💖ƪ)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pipe } from 'remeda'
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const src = computed(() => {
  const referrer = pipe(
    window?.location?.href ?? route.path,
    (value) => encodeURIComponent(value.replace('.html', '')),
  )

  return `https://button.like.co/in/embed/codlin/button?referrer=${referrer}`
})
</script>

<style scoped lang="sass">
</style>

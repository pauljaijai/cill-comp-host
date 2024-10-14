<template>
  <div
    class="frame w-full flex flex-col gap-4 border border-gray-300"
    @click="next"
    @click.right.prevent="prev"
  >
    <carousel-space-floating
      ref="carouselRef"
      class="h-full bg-[#e5e5d9]"
      :images="images"
      :fog-end="10"
      :init-index="0"
    >
      <div class="font-wenkai relative h-full w-full tracking-widest">
        <transition-group name="scale-in">
          <div
            v-if="isTarget('painting-codfish-bakery')"
            class="absolute right-0 top-0 h-full w-1/3 flex-center"
          >
            <div class="text text-xs md:text-xl">
              貪吃的鱈魚
            </div>
          </div>

          <div
            v-if="isTarget('painting-codfish-rain')"
            class="absolute bottom-2 right-3"
          >
            <div class="p-3 text-right text-xs text-white leading-6 md:text-sm">
              陌生的冷雨捎來遠方氣漩的涼意<br>又是個美麗的雨天
            </div>
          </div>

          <div
            v-if="isTarget('photography-fireworks')"
            class="absolute left-0 top-0 h-full w-2/5 flex-center"
          >
            <div class="text text-center text-xs md:text-base">
              繁星想念夜空的擁抱
              <br><br>
              人們想念炫麗的煙花
              <br><br>
              我只想念妳臉龐的餘光
            </div>
          </div>

          <div
            v-if="isTarget('photography-big-stupid-bird')"
            class="absolute right-0 top-0 h-full w-1/3 flex-center"
          >
            <div class="text text-center md:text-xl">
              看<br>啥<br>？
            </div>
          </div>

          <div
            v-if="isTarget('photography-gaomei-windmill')"
            class="absolute bottom-1 right-1"
          >
            <div class="text !px-4 md:text-xl">
              高美濕地
            </div>
          </div>

          <div
            v-if="isTarget('photography-spider-at-night')"
            class="absolute left-0 top-0 h-full w-2/5 flex-center"
          >
            <div class="text-center text-xs text-white md:text-base md:leading-10">
              在無月的夜
              <br>
              悄悄等待
              <br><br>
              燈火闌珊
              <br>
              晚餐依舊沒來
            </div>
          </div>

          <div
            v-if="isTarget('photography-street-cat')"
            class="absolute left-0 top-0 h-full w-1/2 flex-center"
          >
            <div class="text-center text-xs text-white leading-7 md:text-base">
              欲言又止
              <br>
              肚子餓了？
            </div>
          </div>
        </transition-group>
      </div>
    </carousel-space-floating>
  </div>
</template>

<script setup lang="ts">
import type { ExtractComponentProps } from '../../../types/utils.type'
import { Vector2, Vector3 } from '@babylonjs/core'
import { addProp, map } from 'remeda'
import { ref } from 'vue'

import CarouselSpaceFloating from '../carousel-space-floating.vue'

type CarouselProp = ExtractComponentProps<typeof CarouselSpaceFloating>

const duration = 4000

const images: CarouselProp['images'] = map(
  [
    {
      src: '/painting-codfish-bakery.webp',
      offset: new Vector2(0.5, 0),
      scale: 1.4,
      rotation: new Vector3(0, -0.08, 0),
    },
    {
      src: '/painting-codfish-rain.webp',
      scale: 1.6,
      rotation: new Vector3(-0.05, 0, 0),
    },
    {
      src: '/photography-fireworks.jpg',
      offset: new Vector2(-0.7, 0),
      scale: 1.5,
    },
    {
      src: '/photography-gaomei-windmill.jpg',
      scale: 2,
    },
    {
      src: '/photography-big-stupid-bird.jpg',
      offset: new Vector2(0.5, 0),
      scale: 2,
      rotation: new Vector3(0, -0.7, 0),
    },
    {
      src: '/photography-spider-at-night.jpg',
      scale: 2.26,
    },
    {
      src: '/photography-street-cat.jpg',
      scale: 2,
    },
  ],
  addProp('duration', duration),
)

const carouselRef = ref<InstanceType<typeof CarouselSpaceFloating>>()

function isTarget(name: string) {
  const target = carouselRef.value?.stableTarget
  if (!target)
    return

  if (typeof target === 'string') {
    return target.includes(name)
  }

  return target.src.includes(name)
}

function next() {
  carouselRef.value?.next()
}

function prev() {
  carouselRef.value?.prev()
}
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap')

.frame
  aspect-ratio: 1.78

.font-wenkai
  font-family: "LXGW WenKai Mono TC", monospace
  font-weight: 400
  font-style: normal
  color: #222
  text-shadow: 0 0 10px rgba(#111, 0.2)

.text
  padding: 0.25rem
  background: rgba(white, 0.8)
  backdrop-filter: blur(2px)

.scale-in-enter-active, .scale-in-leave-active
  transition-duration: 0.4s
.scale-in-enter-from, .scale-in-leave-to
  transform: scale(0.98) !important
  opacity: 0 !important
</style>

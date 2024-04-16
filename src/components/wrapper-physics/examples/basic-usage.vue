<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300">
    <wrapper-physics
      ref="wrapperRef"
      class="flex flex-col items-start p-4 gap-1 md:w-[40rem] w-full h-[30rem]"
    >
      <div class="flex gap-20 pl-10">
        <wrapper-physics-body>
          <base-btn
            label="開始"
            @click="wrapperRef?.start()"
          />
        </wrapper-physics-body>
        <wrapper-physics-body>
          <base-btn
            label="重置"
            @click="wrapperRef?.reset()"
          />
        </wrapper-physics-body>
      </div>

      <div
        v-for="section, i in sections"
        :key="i"
        class="flex "
        :class="section.class"
      >
        <wrapper-physics-body
          v-for="text, j in section.texts"
          :key="j"
          class=" whitespace-nowrap"
        >
          {{ text }}
        </wrapper-physics-body>
      </div>

      <div class="flex-1" />

      <wrapper-physics-body is-static>
        <base-btn label="🐟" />
      </wrapper-physics-body>
    </wrapper-physics>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseBtn from '../../base-btn.vue';
import WrapperPhysics from '../wrapper-physics.vue';
import WrapperPhysicsBody from '../wrapper-physics-body.vue';

const wrapperRef = ref<InstanceType<typeof WrapperPhysics>>();

const sections = [
  {
    class: 'text-lg font-bold mt-2',
    texts: ['I', 'T', '語', '錄'],
  },
  {
    class: 'text-sm opacity-50 mb-2',
    texts: ['若有雷同，', '那就雷同'],
  },
  {
    texts: ['•　', '世界上', '有 10 種', '人', '，', '一種', '懂二進位', '，', '一種不懂'],
  },
  {
    texts: ['•　', '要改的太多了', '，不如', '改天', '吧'],
  },
  {
    texts: ['•　', '人', '和', '程式', '，一個能', '跑', '就行'],
  },
  {
    texts: ['•　', '在我的', '機器', '上', '可以 work'],
  },
  {
    texts: ['•　', '這 TMD 誰', '寫', '.', '.', '.', '啊是我'],
  },
  {
    texts: ['•　', '這不是', 'bug', '，這是', 'feature'],
  },
  {
    texts: ['•　', '你有', '試過', '重啟', '嗎？'],
  },
  {
    texts: ['•　', '昨天', '還', '好好的'],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <wrapper-physics
      ref="wrapperRef"
      class="flex flex-col items-start p-4 gap-1 border border-dashed w-[40rem] h-[30rem]"
    >
      <div class="flex gap-20">
        <wrapper-physics-body is-static>
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


      <div class="flex text-lg font-bold mt-2">
        <wrapper-physics-body>
          I
        </wrapper-physics-body>
        <wrapper-physics-body class="mr-1">
          T
        </wrapper-physics-body>
        <wrapper-physics-body>
          語
        </wrapper-physics-body>
        <wrapper-physics-body>
          錄
        </wrapper-physics-body>
      </div>

      <div class="flex text-sm opacity-50 mb-2">
        <wrapper-physics-body>
          若有雷同，
        </wrapper-physics-body>

        <wrapper-physics-body>
          那就雷同
        </wrapper-physics-body>
      </div>

      <div
        v-for="items, i in list"
        :key="i"
        class="flex "
      >
        <wrapper-physics-body
          v-for="text, j in items"
          :key="j"
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

const list = [
  ['•　', '世界上', '有 10 種', '人', '，', '一種', '懂二進位', '一種不懂'],
  ['•　', '要改得太多了', '，不如', '改天', '吧'],
  ['•　', '人', '和', '程式', '，一個能', '跑', '就行'],
  ['•　', '在我的', '機器', '上', '可以 work'],
  ['•　', '這 TMD 誰', '寫', '.', '.', '.', '啊是我'],
]
</script>

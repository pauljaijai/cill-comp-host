<template>
  <div class="w-full h-[50vh] border border-gray-300 flex flex-col gap-10 justify-center items-center">
    <div class=" flex gap-4">
      <base-btn
        label="relaxed"
        @click="emotion = 'relaxed'"
      />
      <base-btn
        label="displeased"
        @click="emotion = 'displeased'"
      />
    </div>

    <wrapper-cat-ear :emotion="emotion">
      <div class="border rounded p-2 bg-white">
        ・ω・
      </div>
    </wrapper-cat-ear>

    <wrapper-cat-ear :emotion="emotion">
      <div class="border rounded px-6 py-10 bg-white">
        ʘ ᴥ ʘ
      </div>
    </wrapper-cat-ear>

    <wrapper-cat-ear :emotion="emotion">
      <div class="border rounded px-10 py-2 bg-white">
        ◕ ω ◕
      </div>
    </wrapper-cat-ear>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseBtn from '../../base-btn.vue';
import WrapperCatEar, { EmotionName } from '../wrapper-cat-ear.vue';

const emotion = ref<`${EmotionName}`>('relaxed');
</script>

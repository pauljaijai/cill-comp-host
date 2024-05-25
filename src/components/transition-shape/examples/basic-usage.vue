<template>
  <div class="flex flex-col items-start gap-4 w-full border border-gray-300 p-6">
    <div
      class="border rounded px-4 py-2 cursor-pointer w-full text-center"
      @click="change()"
    >
      更換
    </div>

    <div class="w-full flex flex-col gap-4 border bg-slate-100 rounded p-6 overflow-hidden">
      <div class="flex justify-center">
        <transition-shape :type="imgTransition">
          <img
            :key="index"
            :src="profile"
            class=" w-60 rounded-full object-cover shadow-md border-[0.5rem] border-white"
          >
        </transition-shape>
      </div>

      <div class=" text-2xl font-bold flex flex-col justify-center items-center gap-2">
        鱈魚
        <transition-shape :type="fishTransition">
          <div
            :key="index"
            class="p-2 px-4 text-3xl"
          >
            {{ fish }}
          </div>
        </transition-shape>
      </div>

      <transition-shape :type="textTransition">
        <div
          :key="index"
          class=" p-8 "
        >
          {{ introduction }}
        </div>
      </transition-shape>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { hasAtLeast, piped, reverse } from 'remeda';

import TransitionShape, { TransitionType } from '../transition-shape.vue';

const index = ref(0);

const fishList = [
  '🐟', '🐋🐋', '🐠', '🐡🐡'
];
const fish = computed(() => fishList[index.value % fishList.length]);


const profileList = [
  '/profile.webp',
  '/profile-2.webp',
  '/profile-3.webp',
];
const profile = computed(() => profileList[index.value % profileList.length]);

const introductionList = [
  `一隻熱愛程式的魚，但是沒有手指可以打鍵盤，更買不到能在水裡用的電腦。('◉◞⊖◟◉\` )`,
  '最擅長的球類是地瓜球，一打十輕輕鬆鬆。( •̀ ω •́ )✧',
  `不知道是不是在水裡躺平躺久了，最近喝水也會胖。\n_(:3」ㄥ)_`,
]
const introduction = computed(() => introductionList[index.value % introductionList.length]);


function change() {
  index.value++;
}

const colors: [string, ...string[]] = ['#012030', '#13678A', '#45C4B0', '#9AEBA3', '#DAFDBA'];
const reverseColors = piped(
  reverse<string[]>(),
  (result) => {
    if (!hasAtLeast(result, 1)) {
      throw new Error('At least one color is required');
    }
    return result;
  }
);

const baseOption = {
  duration: 800,
  delay: 100,
}

const imgTransition: TransitionType = {
  name: 'round',
  enter: {
    action: 'spread-scale',
    easing: 'easeOutQuart',
    ...baseOption,
  },
  leave: {
    action: 'scale',
    easing: 'easeInQuart',
    ...baseOption,
  },
  colors,
};

const fishTransition: TransitionType = {
  name: 'rect',
  enter: {
    action: 'slide-down',
    easing: 'easeOutQuart',
    ...baseOption,
  },
  leave: {
    action: 'slide-right',
    easing: 'easeInQuart',
    ...baseOption,
  },
  colors: reverseColors(colors),
};

const textTransition: TransitionType = {
  name: 'fence',
  enter: {
    action: 'spread-left',
    easing: 'easeOutQuart',
    ...baseOption,
  },
  leave: {
    action: 'scale-x',
    easing: 'easeInQuart',
    ...baseOption,
  },
  colors,
};
</script>

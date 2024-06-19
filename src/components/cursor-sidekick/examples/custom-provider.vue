<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <cursor-sidekick
      v-if="enable"
      color="#35abf0"
      :hover-providers="hoverProviders"
    />

    <base-checkbox
      v-model="enable"
      label="啟用小跟班"
      class="p-4 border rounded bg-gray-100"
    />

    <div class="flex flex-col gap-2">
      <div class="">
        嘗試反白這段文字中有鱈魚的部分和沒有鱈魚的部分，看看有甚麼差別。
      </div>

      <hr>

      <base-btn
        disabled
        label="不可以色色 (。・ω・。)"
      />

      <hr>

      <img
        src="/photography-稻穗.jpg"
        url="https://www.flickr.com/photos/coodfish/albums/"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import BaseBtn from '../../base-btn.vue';
import CursorSidekick from '../cursor-sidekick.vue';

import { ContentProvider } from '../use-content-provider';

const enable = ref(false);

const hoverProviders: ContentProvider[] = [
  // 色色按鈕
  {
    match(data) {
      if ('rect' in data) return false;

      if (
        data instanceof HTMLButtonElement ||
        data?.getAttribute('role') === 'button'
      ) {
        if (data.innerHTML.includes('色色')) {
          return true;
        }
      }

      return false;
    },
    getContent(param) {
      return {
        btnList: [
          {
            label: '色色傳送門',
            onClick() {
              window.open('https://vocus.cc/salon/cod-aquarium', '_blank');
            },
          },
        ],
      };
    }
  },

  // 圖片
  {
    match(data) {
      if ('rect' in data) return false;

      if (data instanceof HTMLImageElement) {
        return true;
      }

      return false;
    },
    getContent(param) {
      const { element } = param;
      const target = element?.value;

      if (target instanceof HTMLImageElement) {
        return {
          btnList: [
            {
              label: '📷 查看更多精彩照片',
              onClick() {
                window.open(target.getAttribute('url') ?? '', '_blank');
              },
            },
          ],
        };
      }
    }
  },
];
</script>

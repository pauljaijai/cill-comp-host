<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <input-encoded
      v-model="text"
      class="input-encoded px-3 py-2"
      :charset
      :encode-interval="50"
      :encode-times="5"
    />

    <span class="border-b px-3 pb-1">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { constant } from 'remeda'
import { ref } from 'vue'
import InputEncoded from '../input-encoded.vue'

const text = ref('')

const charset = [
  /** 數字 */
  (char: string) => char.match(/\d/)
    ? '㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉'
    : undefined,

  /** 中文 */
  (char: string) => char.match(/[\u4E00-\u9FA5]/)
    ? 'ㄅㄆㄉㄇㄊㄍㄣㄠㄚㄗㄝㄩㄓㄒㄑㄎㄏ'
    : undefined,

  /** 其他 */
  constant('🐳🐋🐬🐡🦈🐙🦀🦞🦑'),
]
</script>

<style scoped lang="sass">
.input-encoded
  border: 1px solid #ccc
  border-inline: 2px solid #AAA
</style>

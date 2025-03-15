<template>
  <div class="w-full flex flex-col items-center gap-4 border border-gray-300 p-6">
    <input-encoded
      v-model="text"
      class="input-encoded px-3 py-2"
      :charset
    />

    <span class="border-b px-3 pb-1">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputEncoded from '../input-encoded.vue'

const text = ref('')

const charset = [
  /** 中文 */
  (char: string) => char.match(/[\u4E00-\u9FA5]/)
    ? '🍔🍟🌭🍔🍕🍞🥐🥨🥯🍗🍜🍤🍣'
    : undefined,

  /** 其他 */
  () => '?!@#$%^&*()_+-=[]{}|;:,.<>?/\\',
]
</script>

<style scoped lang="sass">
.input-encoded
  border: 1px solid #ccc
  border-inline: 2px solid #AAA
</style>

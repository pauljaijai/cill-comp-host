<template>
  <div class="flex flex-col gap-4 w-full border border-gray-300 p-6">
    <cursor-sidekick class="z-[100]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseCheckbox from '../../base-checkbox.vue';
import BaseInput from '../../base-input.vue';
import CursorSidekick from '../cursor-sidekick.vue';
</script>

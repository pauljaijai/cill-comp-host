<template>
  <div class="full-height full-width flex-center">
    <impossible-toggle />
  </div>
</template>

<script setup lang="ts">
import ImpossibleToggle from '@/components/toggle-proactive/examples/impossible-thing.vue';

// Update document title with version (assuming you want to keep this from previous code)
import { version } from '../package.json';
document.title += ` v${version}`;
</script>

<style lang="sass">
html, body, #app
  width: 100%
  height: 100%
  padding: 0
  margin: 0

#app
  display: flex
  flex-direction: column

.full-height
  height: 100%

.full-width
  width: 100%

.flex-center
  display: flex
  justify-content: center
  align-items: center
</style>
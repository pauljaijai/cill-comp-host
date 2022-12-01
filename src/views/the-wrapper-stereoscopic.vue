<template>
  <div class="w-full flex justify-center">
    <div class="w-3/5 flex flex-col items-start p-10">
      <feature-section
        v-for="section in sections"
        :key="section.title"
        :title="section.title"
        :description="section.description"
      >
        <feature-example
          v-for="ex in section.examples"
          :key="ex.path"
          :path="ex.path"
        />
      </feature-section>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeatureSection from '../components/feature-section.vue';
import FeatureExample from '@/components/feature-example.vue';

const sections = [
  {
    title: '基本用法',
    description: '可以讓元素有 3D 偏轉效果',
    examples: [
      {
        path: 'wrapper-stereoscopic/basic-usage',
      }
    ]
  },
  {
    title: '多層視差',
    description: '利用 layer 可以達成多層視差效果',
    examples: [
      {
        path: 'wrapper-stereoscopic/multi-layer',
      }
    ]
  },
];

</script>

<style scoped lang="sass">
</style>

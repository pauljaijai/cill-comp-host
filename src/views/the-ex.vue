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
import FeatureSection from '@/components/feature-section.vue';
import FeatureExample from '@/components/feature-example.vue';

const sections = [
  {
    title: '基本用法',
    description: '當按鈕狀態為 disable 並觸發 hover、click、key enter 事件時，按鈕會開始亂跑',
    examples: [
      {
        path: 'btn-naughty/basic-usage',
      }
    ]
  },
];

</script>

<style scoped lang="sass">
</style>

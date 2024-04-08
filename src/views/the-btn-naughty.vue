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
    description: '當按鈕狀態為 disabled 並觸發 hover、click、key enter 事件時，按鈕會開始亂跑',
    examples: [
      {
        path: 'btn-naughty/basic-usage',
      }
    ]
  },
  {
    title: '移動距離',
    description: '指定 maxMultiple 可以設定最大移動距離（以寬高倍數）， 若按鈕跑出畫面範圍，會自動回歸原點',
    examples: [
      {
        path: 'btn-naughty/moving-distance',
      }
    ]
  },
  {
    title: '呼叫 method',
    description: '除了元件自身行為外，也可以直接呼叫 method 產生動作',
    examples: [
      {
        path: 'btn-naughty/call-method',
      }
    ]
  },
  {
    title: '自訂按鈕',
    description: '可以使用 default slot 自定義按鈕內容',
    examples: [
      {
        path: 'btn-naughty/custom-button',
      }
    ]
  },
  {
    title: '自訂拓印',
    description: '可以使用 rubbing slot，自訂按鈕拓印內容',
    examples: [
      {
        path: 'btn-naughty/custom-rubbing',
      }
    ]
  },
  {
    title: 'slot prop',
    description: '取得 slot prop 玩出更多花樣',
    examples: [
      {
        path: 'btn-naughty/slot-props',
      }
    ]
  },
];

</script>

<style scoped lang="sass">
</style>

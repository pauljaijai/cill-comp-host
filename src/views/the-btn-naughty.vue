<template>
  <div class="flex flex-col items-start gap-6 p-10">
    <!-- 基本用法 -->
    <q-card
      flat
      bordered
      class=" min-w-[20rem]"
    >
      <q-card-section>
        <div class="text-xl">
          基本用法
        </div>
      </q-card-section>
      <q-card-section class="flex">
        <btn-naughty
          label="調皮的按鈕"
          class=" font-bold"
          disable
          z-index="9999"
        />
      </q-card-section>
    </q-card>


    <!-- 自訂按鈕 -->
    <q-card
      flat
      bordered
      class=" min-w-[20rem]"
    >
      <q-card-section>
        <div class="text-xl">
          自訂按鈕
        </div>
      </q-card-section>
      <q-card-section class="flex">
        <btn-naughty
          disable
          z-index="9999"
        >
          <div class="text-x bg-orange-500 text-white p-4 rounded">
            自定義按鈕
          </div>
        </btn-naughty>
      </q-card-section>
    </q-card>

    <!-- 自訂拓印 -->
    <q-card
      flat
      bordered
      class=" min-w-[20rem]"
    >
      <q-card-section>
        <div class="text-xl">
          自訂拓印
        </div>
      </q-card-section>
      <q-card-section class="flex">
        <btn-naughty
          disable
          z-index="9999"
        >
          <template #rubbing>
            <div class="text-x bg-lime-100 text-lime-500 font-black p-4 rounded-full">
              啪！沒了！
            </div>
          </template>


          <template #default>
            <div class="text-x bg-lime-600 text-white p-4 rounded-full">
              自定義按鈕
            </div>
          </template>
        </btn-naughty>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BtnNaughty from '../components/btn-naughty.vue';

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();


const text = ref('');
</script>

<style scoped lang="sass">
</style>

<template>
  <div class="w-full flex justify-center">
    <div class="w-3/5 flex flex-col items-start gap-6 p-10">
      <feature-section
        title="基本用法"
        description="當按鈕狀態為 disable 並觸發 hover、click、key enter 事件時，按鈕會開始亂跑"
        code-file-path="btn-naughty/basic-usage"
      />

      <!-- <feature-section
        title="移動距離"
        description="
        指定 maxMultiple 可以設定最大移動距離（以寬高倍數），
        若按鈕跑出畫面範圍，會自動回歸原點
         "
      >
        <template #content>
          <div class="flex flex-col items-start gap-4 w-full">
            <q-input
              v-model="maxMultiple"
              type="number"
              outlined
              label="倍數"
              min="1.5"
            />
            <btn-naughty
              label="按鈕"
              class=" font-bold"
              disable
              :max-multiple="maxMultiple"
              z-index="9999"
            />
          </div>
        </template>
      </feature-section>

      <feature-section
        title="呼叫 method"
        description="除了元件自身行為外，也可以直接呼叫 method 產生動作"
      >
        <template #content>
          <div class="flex flex-col items-start gap-4 w-full">
            <div class="flex gap-4">
              <q-btn
                label="移動"
                color="cyan"
                unelevated
                @click="run"
              />
              <q-btn
                label="返回"
                color="teal"
                unelevated
                @click="back"
              />
            </div>
            <btn-naughty
              ref="btn"
              label="按鈕"
              :max-multiple="maxMultiple"
              z-index="9999"
            />
          </div>
        </template>
      </feature-section>

      <feature-section
        title="自訂按鈕"
        description="可以使用 default slot 自定義按鈕內容"
      >
        <template #content>
          <btn-naughty
            disable
            z-index="9999"
          >
            <div class="text-x bg-orange-500 text-white p-4 rounded">
              自定義按鈕
            </div>
          </btn-naughty>
        </template>
      </feature-section>

      <feature-section
        title="拓印"
        description="可以使用 rubbing slot，自訂按鈕拓印內容"
      >
        <template #content>
          <btn-naughty
            disable
            z-index="9999"
          >
            <template #rubbing>
              <div class="text-x bg-lime-100 text-lime-500 text-center font-black p-4 rounded-full">
                啪！跑了
              </div>
            </template>


            <template #default>
              <div class="text-x bg-lime-600 text-white p-4 rounded-full">
                自定義按鈕
              </div>
            </template>
          </btn-naughty>
        </template>
      </feature-section>

      <feature-section
        title="slot prop"
        description="取得 slot prop 玩出更多花樣"
      >
        <template #content>
          <btn-naughty
            disable
            z-index="9999"
          >
            <template #rubbing="{ isRunning }">
              <div class="text-x bg-lime-100 text-lime-500 text-center font-black p-4 rounded-full">
                {{ isRunning ? '😜' : '😗' }}
              </div>
            </template>


            <template #default="{ isRunning }">
              <div class="text-x bg-lime-600 text-white p-4 rounded-full">
                {{ isRunning ? '不給你點' : '我是按紐' }}
              </div>
            </template>
          </btn-naughty>
        </template>
      </feature-section> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import BtnNaughty from '../components/btn-naughty.vue';
import FeatureSection from '../components/feature-section.vue';
import FeatureExample from '@/components/feature-example.vue';


const text = ref('');
const disable = ref(true);
const maxMultiple = ref(1.5);

const btn = ref<InstanceType<typeof BtnNaughty>>();
function run() {
  btn.value?.run();
}
function back() {
  btn.value?.back();
}
</script>

<style scoped lang="sass">
</style>

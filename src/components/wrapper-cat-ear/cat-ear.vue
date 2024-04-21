<template>
  <div>
    <svg
      ref="earRef"
      viewBox="0 0 350 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="ear"
    >
      <circle
        cx="175"
        cy="364.997"
        r="175"
        fill="#CECECE"
        class="base z-[0]"
      />
      <path
        d="M200 0C338 190 350 364.997 350 364.997H0C0 364.997 0 147 200 0Z"
        fill="#CECECE"
        class="outside z-[2]"
      />
      <path
        d="M202 0C350 170 350 364.997 350 364.997H136.5C136.5 364.997 128 225.503 202 0Z"
        fill="#E7E7E7"
        class="inner z-[2]"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { animate } from "motion"
import { constant, times } from 'remeda';

// #region Props
interface Props {
  modelValue?: string;
  isRight?: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  isRight: false,
});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: Props['modelValue']];
}>();
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const earRef = ref<SVGElement>();

onMounted(() => {
  if (!earRef.value) return;

  animate(
    earRef.value,
    {
      rotate: [
        '5deg',
        '-5deg',
        '5deg',
      ],
    },
    {
      easing: times(3, constant('ease-in-out')),
      duration: 2,
      repeat: Infinity,
    }
  );
});

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.ear
  transform-origin: 50% 80%
</style>

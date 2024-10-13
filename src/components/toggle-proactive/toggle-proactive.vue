<template>
  <div
    class="toggle-proactive relative"
    @click="toggle"
  >
    <svg
      viewBox="0 0 640 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="cat-arm">
        <path
          id="arm"
          d="M308 75C319 75.0002 361.5 75.0002 373 75.0001"
          stroke="#DFDFDF"
          stroke-width="80"
          stroke-linecap="round"
        />

        <path
          id="elbow"
          d="M322 75C345 75 383.5 75 399.5 75"
          stroke="#DFDFDF"
          stroke-width="80"
          stroke-linecap="round"
        />
        <g id="pads">
          <path
            id="metacarpal-pad"
            d="M408.941 75.0441C408.941 86.6665 399.875 96.0882 388.691 96.0882C377.507 96.0882 374 87.562 374 75.9396C374 64.3173 377.507 54 388.691 54C399.875 54 408.941 63.4218 408.941 75.0441Z"
            fill="#FFA5A5"
          />
          <path
            id="digital-pad-1"
            d="M420.5 53.1618C420.5 56.0125 416.628 58.3235 413.338 58.3235C410.049 58.3235 407.382 56.0125 407.382 53.1618C407.382 50.311 410.049 48 413.338 48C416.628 48 420.5 50.311 420.5 53.1618Z"
            fill="#FFA5A5"
          />
          <path
            id="digital-pad-2"
            d="M419 96.8383C419 99.689 415.834 102 412.544 102C409.255 102 406.588 99.689 406.588 96.8383C406.588 93.9875 409.255 91.6765 412.544 91.6765C415.834 91.6765 419 93.9875 419 96.8383Z"
            fill="#FFA5A5"
          />
          <path
            id="digital-pad-3"
            d="M432 67.4559C432 70.7452 427.473 73.4118 422.868 73.4118C418.262 73.4118 414.529 70.7452 414.529 67.4559C414.529 64.1665 418.262 61.5 422.868 61.5C427.473 61.5 432 64.1665 432 67.4559Z"
            fill="#FFA5A5"
          />
          <path
            id="digital-pad-4"
            d="M432 82.544C432 85.8334 427.473 88.4999 422.868 88.4999C418.262 88.4999 414.529 85.8334 414.529 82.544C414.529 79.2547 418.262 76.5881 422.868 76.5881C427.473 76.5881 432 79.2547 432 82.544Z"
            fill="#FFA5A5"
          />
        </g>
      </g>
    </svg>

    <div class="track rounded-full bg-gray-500">
      <div
        class="thumb rounded-full bg-white"
        :class="{ 'active': modelValue }"
      />
    </div>

    <div class="keyframes hidden">
      <!-- 1 -->
      <svg
        width="640"
        height="155"
        viewBox="0 0 640 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="cat-arm-1">
          <path
            id="arm"
            d="M308 75C319 75.0002 361.5 75.0002 373 75.0001"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <path
            id="elbow"
            d="M322 75C345 75 383.5 75 399.5 75"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <g id="pads">
            <path
              id="metacarpal-pad"
              d="M408.941 75.0441C408.941 86.6665 399.875 96.0882 388.691 96.0882C377.507 96.0882 374 87.562 374 75.9396C374 64.3173 377.507 54 388.691 54C399.875 54 408.941 63.4218 408.941 75.0441Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-1"
              d="M420.5 53.1618C420.5 56.0125 416.628 58.3235 413.338 58.3235C410.049 58.3235 407.382 56.0125 407.382 53.1618C407.382 50.311 410.049 48 413.338 48C416.628 48 420.5 50.311 420.5 53.1618Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-2"
              d="M419 96.8383C419 99.689 415.834 102 412.544 102C409.255 102 406.588 99.689 406.588 96.8383C406.588 93.9875 409.255 91.6765 412.544 91.6765C415.834 91.6765 419 93.9875 419 96.8383Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-3"
              d="M432 67.4559C432 70.7452 427.473 73.4118 422.868 73.4118C418.262 73.4118 414.529 70.7452 414.529 67.4559C414.529 64.1665 418.262 61.5 422.868 61.5C427.473 61.5 432 64.1665 432 67.4559Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-4"
              d="M432 82.544C432 85.8334 427.473 88.4999 422.868 88.4999C418.262 88.4999 414.529 85.8334 414.529 82.544C414.529 79.2547 418.262 76.5881 422.868 76.5881C427.473 76.5881 432 79.2547 432 82.544Z"
              fill="#FFA5A5"
            />
          </g>
        </g>
      </svg>
      <!-- 2 -->
      <svg
        width="640"
        height="155"
        viewBox="0 0 640 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="cat-arm-2">
          <path
            id="arm"
            d="M308 75C319 75.0002 490 75.0001 501.5 75"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <path
            id="elbow"
            d="M502 75C525 75 563.5 75 579.5 75"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <g id="pads">
            <path
              id="metacarpal-pad"
              d="M588.941 75.0441C588.941 86.6665 579.875 96.0882 568.691 96.0882C557.507 96.0882 554 87.562 554 75.9396C554 64.3173 557.507 54 568.691 54C579.875 54 588.941 63.4218 588.941 75.0441Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-1"
              d="M600 53.1618C600 56.0125 596.628 58.3235 593.338 58.3235C590.049 58.3235 587.382 56.0125 587.382 53.1618C587.382 50.311 590.049 48 593.338 48C596.628 48 600 50.311 600 53.1618Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-2"
              d="M599 97.5C599 100.351 595.834 102 592.544 102C589.255 102 586.588 99.689 586.588 96.8383C586.588 93.9875 589.255 91.6765 592.544 91.6765C595.834 91.6765 599 94.6492 599 97.5Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-3"
              d="M612 67.4559C612 70.7452 607.473 73.4118 602.868 73.4118C598.262 73.4118 594.529 70.7452 594.529 67.4559C594.529 64.1665 598.262 61.5 602.868 61.5C607.473 61.5 612 64.1665 612 67.4559Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-4"
              d="M612 82.544C612 85.8334 607.473 88.4999 602.868 88.4999C598.262 88.4999 594.529 85.8334 594.529 82.544C594.529 79.2547 598.262 76.5881 602.868 76.5881C607.473 76.5881 612 79.2547 612 82.544Z"
              fill="#FFA5A5"
            />
          </g>
        </g>
      </svg>
      <!-- 3 -->
      <svg
        width="640"
        height="155"
        viewBox="0 0 640 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="cat-arm-3">
          <path
            id="arm"
            d="M308 75.0002C319 75.0004 474 68.5002 501.5 75.0002"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <path
            id="elbow"
            d="M502 75C516.5 76 524 73 529 80.5"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <g id="pads">
            <path
              id="metacarpal-pad"
              d="M533.317 80.3738C529.584 91.3803 527.242 102.063 519.799 99.5385C512.356 97.0143 509.955 85.3804 513.688 74.3738C517.421 63.3672 525.874 57.156 533.317 59.6802C540.76 62.2045 537.05 69.3672 533.317 80.3738Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-1"
              d="M541.5 57.9998C540.584 60.6995 539.756 62.7457 536.641 61.6892C533.525 60.6328 531.742 57.5878 532.658 54.888C533.574 52.1883 536.841 50.8562 539.956 51.9127C543.071 52.9691 542.416 55.3 541.5 57.9998Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-2"
              d="M525.139 104.171C524.223 106.871 523.756 108.746 520.641 107.689C517.525 106.633 515.742 103.588 516.658 100.888C517.574 98.1886 520.841 96.8564 523.956 97.9129C527.071 98.9694 526.054 101.471 525.139 104.171Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-3"
              d="M542.633 75.2387C541.577 78.3538 540.869 80.9493 538.069 79.9999C535.269 79.0504 533.856 75.7554 534.913 72.6403C535.969 69.5253 539.095 67.7697 541.895 68.7192C544.694 69.6687 543.69 72.1237 542.633 75.2387Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-4"
              d="M536.366 89.7422C535.31 92.8572 534.335 95.7683 531.725 94.8832C529.115 93.9981 527.856 90.7554 528.913 87.6403C529.969 84.5253 532.941 82.7175 535.551 83.6026C538.161 84.4876 537.423 86.6271 536.366 89.7422Z"
              fill="#FFA5A5"
            />
          </g>
        </g>
      </svg>

      <!-- 4 -->
      <svg
        width="640"
        height="155"
        viewBox="0 0 640 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="cat-arm-4">
          <path
            id="arm"
            d="M308 75C319 75.0002 422 52.9998 501.5 75"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <path
            id="elbow"
            d="M502 75C526.5 75 536 105 504.5 105"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <g id="pads">
            <path
              id="metacarpal-pad"
              d="M502.193 105.216C501.256 116.8 500.38 127.633 500.38 127.633C500.38 127.633 501.206 117.42 502.143 105.836C503.08 94.2513 503.773 85.6821 503.773 85.6821C503.773 85.6821 503.13 93.631 502.193 105.216Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-1"
              d="M503.412 82.4362C503.182 85.2777 503.004 87.4745 503.004 87.4745C503.004 87.4745 503.19 85.171 503.42 82.3295C503.65 79.488 503.836 77.1846 503.836 77.1846C503.837 77.1846 503.642 79.5947 503.412 82.4362Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-2"
              d="M497.385 128.56C497.156 131.401 497 133.321 497 133.321C497 133.321 497.187 131.018 497.416 128.176C497.646 125.335 497.833 123.031 497.833 123.031C497.833 123.031 497.615 125.718 497.385 128.56Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-3"
              d="M501.203 97.0482C500.938 100.327 500.721 103.004 500.721 103.004C500.721 103.004 500.936 100.346 501.201 97.0671C501.467 93.7885 501.682 91.1306 501.682 91.1306C501.682 91.1306 501.468 93.7696 501.203 97.0482Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-4"
              d="M498.828 111.705C498.563 114.984 498.315 118.044 498.315 118.044C498.315 118.044 498.53 115.386 498.795 112.107C499.06 108.829 499.275 106.171 499.275 106.171C499.275 106.171 499.093 108.427 498.828 111.705Z"
              fill="#FFA5A5"
            />
          </g>
        </g>
      </svg>

      <!-- 5 -->
      <svg
        width="640"
        height="155"
        viewBox="0 0 640 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="cat-arm-5">
          <path
            id="arm"
            d="M308 75.0001C319 75.0003 489 42 501.5 75.0001"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <path
            id="elbow"
            d="M502 75C530 84 449 122 405.5 102.5"
            stroke="#DFDFDF"
            stroke-width="80"
            stroke-linecap="round"
          />
          <g id="pads">
            <path
              id="metacarpal-pad"
              d="M399.888 108.52C396.155 119.526 392.664 129.819 392.664 129.819C392.664 129.819 395.955 120.115 399.688 109.109C403.421 98.1023 406.182 89.9607 406.182 89.9607C406.182 89.9607 403.621 97.513 399.888 108.52Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-1"
              d="M406.623 86.7247C405.708 89.4245 405 91.5117 405 91.5117C405 91.5117 405.742 89.3231 406.658 86.6234C407.573 83.9237 408.315 81.7351 408.315 81.7351C408.316 81.7351 407.539 84.025 406.623 86.7247Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-2"
              d="M389.535 129.988C388.619 132.687 388 134.511 388 134.511C388 134.511 388.742 132.323 389.658 129.623C390.574 126.923 391.316 124.735 391.316 124.735C391.316 124.735 390.45 127.288 389.535 129.988Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-3"
              d="M400.919 100.357C399.862 103.472 399 106.016 399 106.016C399 106.016 399.856 103.49 400.913 100.375C401.969 97.2601 402.826 94.7349 402.826 94.7349C402.826 94.7349 401.975 97.2422 400.919 100.357Z"
              fill="#FFA5A5"
            />
            <path
              id="digital-pad-4"
              d="M395.042 113.993C393.986 117.108 393 120.016 393 120.016C393 120.016 393.856 117.491 394.913 114.375C395.969 111.26 396.826 108.735 396.826 108.735C396.826 108.735 396.099 110.878 395.042 113.993Z"
              fill="#FFA5A5"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { omit, pipe } from 'remeda';
import anime from 'animejs';
import { promiseTimeout, useVModel } from '@vueuse/core';
import { onBeforeMount } from 'vue';

// #region Props
interface Props {
  modelValue: boolean;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {});

// #region Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
// #endregion Emits

// #region Slots
defineSlots<{
  default?: () => unknown;
}>();
// #endregion Slots

const modelValue = useVModel(props, 'modelValue');

const objectIds = [
  'arm', 'elbow', 'metacarpal-pad', 'pads',
  'digital-pad-1', 'digital-pad-2', 'digital-pad-3', 'digital-pad-4'
] as const;

const keyframeIds = [
  'cat-arm-1', 'cat-arm-2', 'cat-arm-3',
  'cat-arm-4', 'cat-arm-5',
] as const;

const keyframeOptionMap: Record<
  'in' | 'out', Record<
    typeof keyframeIds[number],
    anime.AnimeParams
  >
> = {
  in: {
    'cat-arm-1': {},
    'cat-arm-2': {
      easing: 'easeInOutQuad',
      duration: 200,
    },
    'cat-arm-3': {
      easing: 'linear',
      duration: 100,
    },
    'cat-arm-4': {
      easing: 'linear',
      duration: 100,
    },
    'cat-arm-5': {
      easing: 'easeOutBack',
      duration: 200,
    },
  },
  out: {
    'cat-arm-5': {},
    'cat-arm-4': {
      easing: 'easeInQuad',
      duration: 100,
    },
    'cat-arm-3': {
      easing: 'linear',
      duration: 100,
    },
    'cat-arm-2': {
      easing: 'linear',
      duration: 100,
    },
    'cat-arm-1': {
      easing: 'linear',
      duration: 200,
    },
  },
} as const

function toKeyframe(
  direction: keyof typeof keyframeOptionMap,
  frameId: (typeof keyframeIds)[number],
) {
  const tasks = objectIds.map((id) => {
    // 取得所有 attr
    const attrMap = pipe(
      document.querySelector(`#${frameId} #${id}`)?.attributes,
      (attrNode) => {
        if (!attrNode) {
          return {};
        }

        const result: Record<string, string> = {};
        for (let i = 0; i < attrNode.length; i++) {
          const node = attrNode[i];
          if (!node) continue;

          const { name, value } = node;
          result[name] = value;
        }
        return result;
      },
      omit(['id', 'ref', 'fill', 'stroke', 'stroke-width', 'stroke-linecap'])
    );

    return anime({
      targets: `#cat-arm #${id}`,
      ...attrMap,
      ...keyframeOptionMap[direction][frameId],
    }).finished
  })

  return Promise.all(tasks);
}

function toggle() {
  modelValue.value = !modelValue.value;
  start();
}

async function start() {
  await toKeyframe('in', 'cat-arm-2');
  await toKeyframe('in', 'cat-arm-3');
  await toKeyframe('in', 'cat-arm-4');
  await toKeyframe('in', 'cat-arm-5');

  await promiseTimeout(100);

  await toKeyframe('out', 'cat-arm-4');
  await toKeyframe('out', 'cat-arm-3');
  await toKeyframe('out', 'cat-arm-2');
  await toKeyframe('out', 'cat-arm-1');
}

onBeforeMount(() => {
  anime.remove(objectIds.map((id) => `#${id}`));
})

// #region Methods
defineExpose({});
// #endregion Methods
</script>

<style scoped lang="sass">
.toggle-proactive
  aspect-ratio: 2
  height: 5rem
  .track
    position: relative
    width: 100%
    height: 100%
  .thumb
    position: absolute
    height: 80%
    top: 10%
    left: 50%
    aspect-ratio: 1
    transition-duration: 0.4s
    transform: translateX(-100%)
    &.active
      transform: translateX(0%)
  svg
    position: absolute
    top: 0
    left: 50%
    height: 100%
    aspect-ratio: 640 / 155
    transform: translateX(-50%)
</style>

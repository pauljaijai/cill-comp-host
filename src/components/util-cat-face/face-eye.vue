<template>
  <svg
    class="h-full w-full"
    viewBox="0 0 1500 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="face-eye">
      <path
        id="eye-r"
        d="M166 508C166 445.94 215.945 418 256 418C296.055 418 346 448.165 346 508C346 567.835 316.082 598 256 598C195.918 598 166 563.879 166 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
      <path
        id="eye-l"
        d="M1346 508C1346 445.94 1296.05 418 1256 418C1215.95 418 1166 448.165 1166 508C1166 567.835 1195.92 598 1256 598C1316.08 598 1346 563.879 1346 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
    </g>

  </svg>

  <div class="hidden">
    <g class="neutral">
      <path
        id="eye-r"
        d="M166 508C166 445.94 215.945 418 256 418C296.055 418 346 448.165 346 508C346 567.835 316.082 598 256 598C195.918 598 166 563.879 166 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
      <path
        id="eye-l"
        d="M1346 508C1346 445.94 1296.05 418 1256 418C1215.95 418 1166 448.165 1166 508C1166 567.835 1195.92 598 1256 598C1316.08 598 1346 563.879 1346 513.192"
        stroke="black"
        stroke-width="200"
        stroke-linecap="round"
      />
    </g>

    <g class="neutral">
      <path
        id="eye-r"
        d="M166 508C166 506.621 215.945 506 256 506C296.055 506 346 506.67 346 508C346 509.33 316.082 510 256 510C195.918 510 166 509.242 166 508.115"
        stroke="black"
        stroke-width="100"
        stroke-linecap="round"
      />
      <path
        id="eye-l"
        d="M1346 508C1346 506.621 1296.05 506 1256 506C1215.95 506 1166 506.67 1166 508C1166 509.33 1195.92 510 1256 510C1316.08 510 1346 509.242 1346 508.115"
        stroke="black"
        stroke-width="100"
        stroke-linecap="round"
      />
    </g>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs'
import { omit, pipe, piped, reduce } from 'remeda'
import { onMounted } from 'vue'

// #region Props
interface Props {
  modelValue?: string;
}
// #endregion Props
const props = withDefaults(defineProps<Props>(), {})

const partIdList = ['eye-r', 'eye-l'] as const

const getPathAttrs = piped(
  (attrNode?: NamedNodeMap) => {
    if (!attrNode)
      return {}

    const result: Record<string, string> = {}
    for (let i = 0; i < attrNode.length; i++) {
      const node = attrNode[i]
      if (!node)
        continue

      const { name, value } = node
      result[name] = value
    }
    return result
  },
  omit(['id', 'ref', 'fill', 'stroke', 'stroke-linecap']),
)

async function init() {
  const keyframeList = pipe(
    Array.from(document.querySelectorAll('.neutral')),
    (list) => list.map((item) => {
      const partList = pipe(
        partIdList,
        reduce((acc, partId) => {
          const target = item.querySelector(`#${partId}`)
          acc[partId] = getPathAttrs(target?.attributes)

          return acc
        }, {} as Record<typeof partIdList[number], Record<string, string>>),
      )

      return partList
    }),
  )

  anime.remove(
    partIdList.map((id) => `#face-eye #${id}`),
  )

  await Promise.all(
    partIdList.map((id) =>
      anime({
        targets: `#face-eye #${id}`,
        ...keyframeList[0]?.[id],
        duration: 500,
      }),
    ),
  )

  await Promise.all(
    partIdList.map((id) =>
      anime({
        targets: `#face-eye #${id}`,
        keyframes: keyframeList.map((keyframe) => keyframe[id]),
        duration: 50,
        delay: 3000,
        loop: true,
        direction: 'alternate',
      }),
    ),
  )
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="sass">
</style>

import { useElementBounding } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { type Directive, reactive, watch } from 'vue'
import { bgSnowStore as store } from './bg-snow-store'

export const vBgStatic: Directive = {
  mounted(el) {
    const id = nanoid()
    el.setAttribute('data-bg-snow-id', id)

    const bounding = reactive(useElementBounding(el))

    watch(bounding, (value) => {
      store.put(id, value)
    }, {
      immediate: true,
      deep: true,
    })
  },
  unmounted(el) {
    const id = el.getAttribute('data-bg-snow-id')
    if (id) {
      store.remove(id)
    }
  },
}

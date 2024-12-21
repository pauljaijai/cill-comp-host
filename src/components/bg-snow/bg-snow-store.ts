import { pick } from 'remeda'
import { reactive } from 'vue'

export interface ElementBounding {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const bgSnowStore = reactive({
  // 使用 Map 會導致 Worker 出現 #<Map> could not be cloned.
  staticMap: {} as Record<string, ElementBounding>,
  put(id: string, bounding: ElementBounding) {
    this.staticMap[id] = pick(bounding, ['top', 'left', 'width', 'height'])
  },
  remove(id: string) {
    delete this.staticMap[id]
  },
})

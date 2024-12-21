import { reactive } from 'vue'

interface ElementBounding {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const bgSnowStore = reactive({
  staticMap: new Map<string, ElementBounding>(),
  put(id: string, bounding: ElementBounding) {
    this.staticMap.set(id, bounding)
  },
  remove(id: string) {
    this.staticMap.delete(id)
  },
})

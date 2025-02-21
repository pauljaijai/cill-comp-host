import type { CSSProperties } from 'vue'
import { omit, pipe, piped, reduce } from 'remeda'

export const getPathAttrs = piped(
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
  omit(['id', 'ref']),
)
export function getCursorAttrs<Id extends string>(
  svgId: string,
  partIdList: (readonly Id[]) | Id[],
  cursor: CSSProperties['cursor'],
) {
  return pipe(
    Array.from(document.querySelectorAll(`#${svgId} #${cursor}`)),
    ([item]) => {
      const partList = pipe(
        partIdList,
        reduce((acc, partId) => {
          const target = item?.querySelector(`#${partId}`)
          acc[partId] = getPathAttrs(target?.attributes)

          return acc
        }, {} as Record<typeof partIdList[number], Record<string, string>>),
      )

      return partList
    },
  )
}

export function getSpreadAttrs<Id extends string>(
  svgId: string,
  partIdList: (readonly Id[]) | Id[],
) {
  return pipe(
    Array.from(document.querySelectorAll(`#${svgId} .spread`)),
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
}

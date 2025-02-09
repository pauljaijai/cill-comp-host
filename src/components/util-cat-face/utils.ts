import type { FacialExpression } from './type'
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
  omit(['id', 'ref', 'fill', 'stroke', 'stroke-linecap']),
)
export function getKeyframeList<Id extends string>(
  partIdList: (readonly Id[]) | Id[],
  facialExpression: FacialExpression,
) {
  return pipe(
    Array.from(document.querySelectorAll(`.${facialExpression}`)),
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

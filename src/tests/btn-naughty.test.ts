import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import BtnNaughty from '../components/btn-naughty/btn-naughty.vue'

describe('測試按鈕 props', () => {
  it('指定 label', () => {
    const wrapper = mount(BtnNaughty, {
      props: {
        label: '我是按紐',
      },
    })

    expect(wrapper.text()).toContain('我是按紐')
  })
})

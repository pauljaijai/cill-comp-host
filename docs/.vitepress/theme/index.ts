import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DonateSection from '../../../src/components/donate-section.vue'
import './style.css'

import './tailwind.css'

// import VConsole from 'vconsole';
// const vConsole = new VConsole();

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-footer-before': () => h(DonateSection),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme

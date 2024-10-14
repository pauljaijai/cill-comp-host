import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'fit': 'w-full h-full',
      'flex-col': 'flex flex-col',
      'flex-center': 'flex justify-center items-center',
    },
  ],
  rules: [],
  presets: [
    presetUno(),
  ],
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import prismjs from 'vite-plugin-prismjs'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: false })]
    }),
    Components(
      {
        resolvers: [ElementPlusResolver({ importStyle: false })]
      },
      ElementPlus()
    ),
    prismjs({
      languages: 'all',
      plugins: [
        'inline-color', //突出颜色块
        'toolbar', //复制块按钮
        'copy-to-clipboard', //复制代码功能
        'line-numbers' //配置显示行号插件
      ],
      theme: 'okaidia',
      css: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

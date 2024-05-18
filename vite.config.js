import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import prismjs from 'vite-plugin-prismjs'
// pwa
// import { VitePWA } from 'vite-plugin-pwa'

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
    }),
    // VitePWA({
    //   manifest: {
    //     name: 'My Awesome App',
    //     short_name: 'MyApp',
    //     description: 'My Awesome App description',
    //     theme_color: '#ffffff',
    //     icons: [
    //       //添加图标， 注意路径和图像像素正确
    //       {
    //         src: 'public/favicon.ico',
    //         sizes: '32x32',
    //         type: 'image/x-icon'
    //       }
    //     ]
    //   },
    //   registerType: 'autoUpdate',
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'], //缓存相关静态资源
    //     runtimeCaching: [
    //       {
    //         //由于要测试第三方API， 这里配置缓存访问第三方API的资源
    //         handler: 'CacheFirst',
    //         urlPattern: /^https:\/\/jsonplaceholder/, //注意，要修改成要测试的API。请使用正则表达式匹配
    //         method: 'GET',
    //         options: {
    //           cacheName: 'test-external-api', //创建缓存名称
    //           expiration: {
    //             maxEntries: 10,
    //             maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
    //           },
    //           cacheableResponse: {
    //             statuses: [0, 200]
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

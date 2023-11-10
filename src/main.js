import { createApp } from 'vue'
import { createPinia } from 'pinia'
import pesist from 'pinia-plugin-persist'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './style/common.css'
import './style/utils.css'
// import 'github-markdown-css/github-markdown.css' //布局
import './style/heti.css'

import { VueShowdownPlugin } from 'vue-showdown'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia().use(pesist))
app.use(router)

app.use(VueShowdownPlugin, {
  // 设置 showdown 默认 flavor
  flavor: 'github',
  // 设置 showdown 默认 options （会覆盖上面 flavor 的 options）
  options: {
    emoji: false
  }
})

app.mount('#app')

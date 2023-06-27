import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import './styles/index.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './permission' //权限控制器
// 统一导入全部el-icon组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(ElementPlus, {
	locale: zhCn,
})
app.use(pinia)

// 全局注册el-icon组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.mount('#app')

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

// !element-plus出现 ResizeObserver loop limit exceeded错误解决方法
const debounce = (fn: any, delay: number) => {
	let timer: any = null
	return function (...args: any) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(args)
		}, delay)
	}
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
	constructor(callback: any) {
		callback = debounce(callback, 16)
		super(callback)
	}
}

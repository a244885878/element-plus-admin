import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { staticRoutes } from '@/router'
import { landRoute } from '@/router/landRoute'

const finalRoutes = staticRoutes // 最终路由数据(映射路由表)

// 路由懒加载
const loadView = (view: any) => {
	return () => import('@/views' + view)
}

// 将路由指向Layout
const loadLayout = () => {
	return () => import('@/components/Layout/index.vue')
}

// 递归修改路由函数
const filterAsyncRoutes = (routes: any) => {
	for (const i in routes) {
		if (routes[i].component === 'Layout') {
			routes[i].component = loadLayout()
		} else {
			routes[i].component = loadView(routes[i].component)
		}
		if (routes[i].children?.length > 0) {
			filterAsyncRoutes(routes[i].children)
		}
	}
}

const userStore = defineStore({
	id: 'userStore',
	state: () => ({
		token: getToken(),
		routers: [] as any,
	}),
	getters: {},
	actions: {
		// 设置路由
		generateRoutes() {
			return new Promise((resolve) => {
				let accessedRoutes = [] // 声明一个用于渲染菜单的路由数据
				if (this.routers) {
					//深拷贝路由表
					accessedRoutes = JSON.parse(JSON.stringify(this.routers))
				}
				filterAsyncRoutes(accessedRoutes) // 过滤component
				finalRoutes[0].children = accessedRoutes
				this.routers = accessedRoutes
				resolve(finalRoutes)
			})
		},
		// 用户登录
		login(userInfo: any) {
			return new Promise((resolve) => {
				console.log(userInfo)
				setToken('token')
				resolve('login')
			})
		},
		// 获取用户信息
		getInfo() {
			return new Promise((resolve, reject) => {
				// 测试路由
				const testRoutes: any = [
					{
						path: '/test',
						name: 'test',
						component: '/test/index.vue',
						redirect: '/test/test2',
						meta: {
							hidden: false,
							title: 'test',
							icon: 'Grid',
						},
						children: [
							{
								path: '/test/test2',
								name: 'test2',
								component: '/test/test2/index.vue',
								meta: {
									hidden: false,
									title: 'test2',
									icon: 'StarFilled',
								},
							},
							{
								path: '/test/test3',
								name: 'test3',
								component: '/test/test3/index.vue',
								meta: {
									hidden: false,
									title: 'test3',
									icon: 'StarFilled',
								},
							},
						],
					},
				]
				this.routers = [...landRoute, ...testRoutes]
				resolve('getInfo')
			})
		},
		// 登出
		logout() {
			return new Promise((resolve) => {
				this.token = ''
				removeToken()
				router.push({
					path: '/login',
				})
				this.routers = []
				resolve('logout')
			})
		},
		// 删除Token
		resetToken() {
			return new Promise((resolve) => {
				this.token = ''
				this.routers = []
				removeToken()
				resolve('resetToken')
			})
		},
	},
})

export default userStore

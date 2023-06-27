import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

const userStore = defineStore({
	id: 'userStore',
	state: () => ({
		hasAuth: false,
		token: getToken(),
		routers: [],
	}),
	getters: {},
	actions: {
		// 用户登录
		login(userInfo: any) {
			return new Promise((resolve) => {
				setToken('token')
				router.push({ path: '/' })
				resolve('login')
			})
		},
		// 获取用户信息
		getInfo() {
			return new Promise((resolve, reject) => {
				this.hasAuth = true
				resolve(111)
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
				resolve(null)
			})
		},
		// 删除Token
		resetToken() {
			return new Promise((resolve) => {
				this.token = ''
				this.routers = []
				removeToken()
				resolve(null)
			})
		},
	},
})

export default userStore

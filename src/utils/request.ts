import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import userStore from '@/store/user'
import { getToken, TokenKey } from '@/utils/auth'

const baseURL = process.env.VUE_APP_BASE_API
// 创建一个axios实例
const service = axios.create({
	baseURL,
	timeout: 1000 * 60, // 超时时间
})

//全局Loading控制器
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading()
	}
	needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return
	needLoadingRequestCount--
	if (needLoadingRequestCount === 0) endLoading()
}

let loading: any
function startLoading() {
	loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})
}

function endLoading() {
	loading.close()
}

//请求拦截器
service.interceptors.request.use(
	(config) => {
		showFullScreenLoading()
		if (getToken()) {
			config.headers[TokenKey] = getToken()
		}
		return config
	},
	(error) => {
		console.log(error)
		tryHideFullScreenLoading()
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		const { responseType } = response.request
		const res = response.data
		if (responseType === 'blob') {
			tryHideFullScreenLoading()
			return res
		}
		const user = userStore()
		if (res.code != 200) {
			ElMessage.error(res.msg || 'error')
			// 当code为登出时
			if (res.code === 50008) {
				// 调用登出方法
				user.logout()
				ElMessage.error('您已经登出,请重新登录')
			}
		}
		tryHideFullScreenLoading()
		return res
	},
	(error) => {
		console.log('err' + error) // for debug
		tryHideFullScreenLoading()
		ElMessage.error(error || 'error')
		return Promise.reject(error)
	}
)

export default service

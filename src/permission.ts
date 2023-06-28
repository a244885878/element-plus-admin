import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import router from './router'
import userStore from './store/user'
import getPageTitle from '@/utils/get-page-title'
import { ElMessage } from 'element-plus'

const whiteList = ['/login'] // 没有重定向的白名单
router.beforeEach(async (to: any, from: any, next) => {
	const user = userStore()
	// 开始 进度条
	NProgress.start()
	// 设置页面标题
	document.title = getPageTitle(to.meta.title)
	//确认用户是否已登录
	const hasToken = getToken()
	if (hasToken) {
		if (to.path === '/login') {
			// 如果已登录，重定向到主页
			next({ path: '/' })
			NProgress.done() //关闭NProgress
		} else {
			// 保存在store中路由不为空则放行 (如果执行了刷新操作，则 store 里的路由为空，此时需要重新添加路由)
			if (user.routers?.length > 0) {
				next()
			} else {
				try {
					// 然后获取用户信息
					await user.getInfo()
					// 根据角色生成可访问的路由图
					const accessRoutes: any = await user.generateRoutes()
					// 动态添加可访问路由
					for (const i in accessRoutes) {
						router.addRoute(accessRoutes[i])
					}
					// hack方法，以确保addRoutes是完整的
					// 设置replace: true，这样导航就不会留下历史记录
					next({ ...to, replace: true })
				} catch (error) {
					// 删除token，然后进入登录页面重新登录
					console.log(error)
					await user.resetToken()
					ElMessage.error('出现错误,访问失败,请重新登录')
					next({ path: '/login' })
					NProgress.done()
				}
			}
		}
	} else {
		/* 没有token时*/
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接放行
			next()
		} else {
			// 其他没有访问权限的页面将被重定向到登录页面。
			next({ path: '/login' })
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	// 完成进度条
	NProgress.done()
})

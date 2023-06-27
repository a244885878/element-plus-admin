import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () =>
			import(/* webpackChunkName: "home" */ '@/views/home.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/404/index.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router

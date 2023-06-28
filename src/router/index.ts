import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home/index.vue'),
		redirect: '/index',
		children: [],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/404/index.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: staticRoutes,
})

export default router

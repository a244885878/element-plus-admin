<template>
	<el-icon
		color="#909399"
		class="no-inherit"
		:size="25"
		@click="foldMenu()"
		:class="state.isFoldMenu ? 'isFoldMenu' : ''"
	>
		<Expand />
	</el-icon>
	<el-breadcrumb separator="/" class="breadcrumb">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<transition-group name="breadcrumb">
			<template v-for="(item, index) in state.routerList" :key="index">
				<el-breadcrumb-item
					:to="{ path: item.path }"
					v-if="index !== state.routerList.length - 1"
					>{{ item.meta.title }}</el-breadcrumb-item
				>
				<el-breadcrumb-item v-else-if="item.path !== '/index'">{{
					item.meta.title
				}}</el-breadcrumb-item>
			</template>
		</transition-group>
	</el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import bus from '@/utils/bus'
import userStore from '@/store/user'
import { Expand } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'
import { debounce } from '@/utils/tools'

const route = useRoute()
const user = userStore()

//获取本地存储的折叠状态
const getCollapsed = () => {
	return JSON.parse(localStorage.getItem('isFold') as any)
}

//设置本地存储折叠状态
const storeCollapsed = (val: any) => {
	localStorage.setItem('isFold', val)
}

const state = reactive<any>({
	isFoldMenu: getCollapsed(),
	routerList: [], //路由信息
})

const toFoldMenu = () => {
	if (window.innerWidth <= 800) {
		foldMenu(true)
	}
}

// 监听页面缩放
const monitorFn = debounce(toFoldMenu, 100)
window.addEventListener('resize', monitorFn)

// 点击折叠按钮
const foldMenu = (val?: boolean) => {
	state.isFoldMenu = val || !state.isFoldMenu
	storeCollapsed(state.isFoldMenu)
	bus.emit('isFold', state.isFoldMenu)
}

//监听路由
watch(
	() => route.path,
	(newVal) => {
		const routerList = cutRoute(newVal)
		setRouterList(routerList)
	}
)

//切割路由信息
const cutRoute = (route: any) => {
	const arr = route.split('/')
	arr.shift()
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '/' + arr[i]
		if (i !== 0) {
			arr[i] = arr[i - 1] + arr[i]
		}
	}
	return arr
}

const routers = user.routers

//设置路由信息
const setRouterList = (list: any) => {
	state.routerList = []
	recursionFindRoute(list, routers)
}

//递归查找路由信息
const recursionFindRoute = (list: any, routers: any) => {
	for (let i in list) {
		for (let j in routers) {
			if (list[i] === routers[j].path) {
				state.routerList.push(routers[j])
				if (routers[j].children && routers[j].children.length > 0) {
					recursionFindRoute(list, routers[j].children)
				}
			}
		}
	}
}

//刷新设置面包屑
const routerList = cutRoute(route.fullPath)
setRouterList(routerList)
</script>

<style lang="scss" scoped>
@import '@/styles/transition.scss';

.no-inherit {
	margin-left: 30px;
	cursor: pointer;
	transition: all 0.05s linear;
	:hover {
		color: #409eff;
	}
}

.isFoldMenu {
	transform: rotate(180deg);
}

.breadcrumb {
	margin-left: 20px;
}
</style>

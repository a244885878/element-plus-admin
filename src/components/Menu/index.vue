<template>
	<div class="menu_box">
		<el-menu
			:active-text-color="state.activeColor"
			:background-color="state.backgroundColor"
			class="el-menu-vertical-demo"
			:default-active="state.defaultPath"
			:text-color="state.textColor"
			:collapse="state.isFold"
			:collapse-transition="true"
		>
			<div class="menu_top">
				<img :src="state.logo" />
				<div v-show="!state.isFold">{{ state.title }}</div>
			</div>
			<el-scrollbar>
				<SideBar :list="user.routers" :isFold="state.isFold"></SideBar>
			</el-scrollbar>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import settings from '@/settings'
import userStore from '@/store/user'
import bus from '@/utils/bus'
import SideBar from './SideBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = userStore()

//获取本地存储的折叠状态
const getCollapsed = () => {
	return JSON.parse(localStorage.getItem('isFold') as any)
}

//接收Breadcrumb发送的折叠状态
bus.on('isFold', (val) => {
	state.isFold = val
})

const state = reactive({
	backgroundColor: '#32363C',
	textColor: 'rgb(191, 203, 217)',
	activeColor: '#ffd04b',
	logo: require('@/assets/logo.png'),
	title: settings.title,
	isFold: getCollapsed(),
	defaultPath: null, //默认菜单选中
})

//监听路由
watch(
	() => route.path,
	(newVal) => {
		setMenu(newVal)
	}
)

//设置菜单选中
const setMenu = (path: any) => {
	state.defaultPath = path
}

setMenu(route.fullPath)
</script>

<style lang="scss" scoped>
.menu_box {
	width: 100%;
	height: 100%;
	position: relative;

	.menu_top {
		width: 99.6%;
		height: 50px;
		background: #32363c;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 14px;
		font-weight: bold;

		img {
			width: 28px;
			height: 28px;
			margin-left: 20px;
			vertical-align: middle;
		}

		div {
			margin-left: 20px;
			width: 170px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.el-menu-vertical-demo {
		height: 100%;
	}
}

.el-scrollbar {
	height: calc(100% - 50px) !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 250px; //宽度自己掌握
	height: 100%;
}

.hideSpan {
	span {
		display: none !important;
	}
}
</style>

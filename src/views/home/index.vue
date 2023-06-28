<template>
	<div id="main">
		<aside>
			<Menu></Menu>
		</aside>
		<section>
			<nav>
				<div class="nav_top">
					<div class="nav_top_left">
						<Breadcrumb></Breadcrumb>
					</div>
					<div class="nav_top_right">
						<Dropdown></Dropdown>
					</div>
				</div>
				<el-scrollbar class="tag-box">
					<RouterTag></RouterTag>
				</el-scrollbar>
			</nav>
			<div class="content_box">
				<el-scrollbar>
					<router-view v-slot="{ Component }">
						<transition name="el-fade-in-linear" mode="out-in">
							<component
								:is="Component"
								:key="Component"
							></component>
						</transition>
					</router-view>
				</el-scrollbar>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import bus from '@/utils/bus'
import { reactive } from 'vue'
import Menu from '@/components/Menu/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Dropdown from '@/components/Dropdown/index.vue'
import RouterTag from '@/components/RouterTag/index.vue'

//获取本地存储的折叠状态
const getCollapsed = () => {
	return JSON.parse(localStorage.getItem('isFold') as any)
}

//接收Breadcrumb发送的折叠状态
bus.on('isFold', (val) => {
	state.isFold = val
})

const state = reactive({
	isFold: getCollapsed(),
})
</script>

<style scoped lang="scss">
@import '@/styles/transition.scss';

$asideWidth: 250px;
$asideFoldWidth: 64px;
$navHeight: 84px;

#main {
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;

	aside {
		height: 100%;
		float: left;
	}

	section {
		height: 100%;
		overflow: hidden;

		nav {
			height: $navHeight;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 2;

			.nav_top {
				height: 50px;
				overflow: hidden;
				position: relative;
				background: #fff;
				-webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
				box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
				display: flex;
				justify-content: space-between;

				.nav_top_left {
					display: flex;
					align-items: center;
				}
				.nav_top_right {
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}

			.tag-box {
				width: calc(100% - 60px);
				height: 34px;
				margin: 0 auto;
				display: flex;
        padding-top: 3px;
        box-sizing: border-box;
			}
		}
	}

	.content_box {
		width: 100%;
		height: calc(100% - $navHeight);
	}
}
</style>

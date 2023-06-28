<template>
	<div :class="props.isFold ? 'hideSpan' : ''">
		<template v-for="(item, index) in props.list" :key="index">
			<template v-if="decideHidden(item)">
				<!-- 无children -->
				<el-menu-item
					:index="item.path"
					v-if="!item.children || item.children.length === 0"
					@click="toPath(item)"
				>
					<el-icon v-if="item.meta.icon">
						<component :is="item.meta.icon"></component>
					</el-icon>
					<template #title>{{ item.meta.title }}</template>
				</el-menu-item>
				<!-- 有children -->
				<el-sub-menu :index="item.path" v-else>
					<template #title>
						<el-icon v-if="item.meta.icon">
							<component :is="item.meta.icon"></component>
						</el-icon>
						<span>{{ item.meta.title }}</span>
					</template>
					<template
						v-if="!item.children || item.children.length == 0"
					>
						<el-menu-item
							:index="item2.path"
							:key="index2"
							v-for="(item2, index2) in item.children"
							@click="toPath(item)"
						>
							{{ item.meta.title }}
						</el-menu-item>
					</template>
					<SideBar
						:list="item.children"
						v-if="item.children && item.children.length > 0"
					></SideBar>
				</el-sub-menu>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
	list: {
		type: Array as any,
		default: () => {
			return []
		},
	},
	isFold: {
		type: Boolean,
	},
})

//判断是否隐藏菜单
const decideHidden = (item: any) => {
	if (!item.meta) {
		return true
	}
	if (!item.meta.hidden) {
		return true
	} else {
		return false
	}
}

//点击菜单
const toPath = (ev: any) => {
	router.push({
		path: ev.path,
	})
}
</script>

<style lang="scss" scoped>
.hideSpan {
	span {
		display: none !important;
	}
	.el-icon.el-sub-menu__icon-arrow {
		display: none !important;
	}
}
</style>

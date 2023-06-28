<template>
	<div class="tag-list-box">
		<div
			class="tag-item"
			:class="item.active ? 'tag-item-active' : ''"
			v-for="(item, index) in list"
			:key="index"
			@click="changePath(item)"
		>
			<span>{{ item.meta.title }}</span>
			<span
				class="close-box"
				v-if="!item.meta.affix"
				@click.stop="close(item)"
			>
				<Close class="close" />
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { landRoute } from '@/router/landRoute'
import { watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const list = reactive<any>([...landRoute])

const changePath = (item: any) => {
	router.push({ path: item.path })
}

const close = (item: any) => {
	for (let i = 0; i < list.length; i++) {
		const v = list[i]
		if (v.path === item.path) {
			list.splice(i, 1)
			break
		}
	}
	if (item.active) {
		router.push({ path: list[list.length - 1].path })
	}
}

watch(
	() => route,
	(newVal: any) => {
		const newRoute: any = {
			path: newVal.path,
			meta: newVal.meta,
		}
		for (let i = 0; i < list.length; i++) {
			const v = list[i]
			v.active = false
			if (v.path == newRoute.path) {
				v.active = true
			}
		}
		if (!list.find((v: any) => v.path == newRoute.path)) {
			newRoute.active = true
			list.push(newRoute)
		}
	},
	{ deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.tag-list-box {
	display: flex;
	align-items: center;

	.tag-item {
		position: relative;
		cursor: pointer;
		height: 26px;
		line-height: 26px;
		border: 1px solid #d8dce5;
		color: #495060;
		background: #fff;
		padding: 0 8px;
		font-size: 12px;
		margin-right: 6px;
		width: auto;
		display: flex;
		align-items: center;
		flex-shrink: 0;

		.close-box {
			display: inline-block;
			width: 16px;
			height: 16px;
			margin-left: 5px;
			transition: all 0.2s;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;

			&:hover {
				background: #acb3c4;
				.close {
					color: #fff;
				}
			}

			.close {
				width: 8px;
				height: 8px;
				color: #495060;
			}
		}
	}

	.tag-item-active {
		background-color: #42b983;
		color: #fff;
		border-color: #42b983;

		.close {
			width: 8px;
			height: 8px;
			color: #fff !important;
		}
	}
}
</style>

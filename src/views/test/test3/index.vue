<template>
	<div>
		<h3 style="text-align: center">虚拟滚动列表</h3>
		<div class="list" ref="listRef" @scroll.passive="getScroll">
			<div
				:style="{
					height: height * options.length + 'px',
					width: '100%',
				}"
			>
				<div
					class="item"
					v-for="(item, index) in options.slice(
						min,
						min + 10 + cacheCount
					)"
					:key="index"
					:style="{
						transform: `translateY(${height * item.index}px)`,
					}"
				>
					{{ item.value }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const min = ref(0)
const cacheCount = 5
const height = 40
const heightStr = computed(() => {
	return height + 'px'
})

const getScroll = (event: any): void => {
	let scrollTop = event.target?.scrollTop
	min.value = Math.ceil(scrollTop / height)
	// 前面插入n条
	if (min.value > cacheCount) {
		min.value = min.value - cacheCount
	}
}

type Options = { value: string; index: number }[]

const options = ref<Options>(
	Array.from({ length: 100000 }).map((_, idx) => ({
		value: `Option ${idx + 1}`,
		index: idx,
	}))
)
</script>

<style scoped lang="scss">
.list {
	margin: 10px auto;
	width: 300px;
	height: 200px;
	overflow-y: scroll;
	position: relative;
	border: 1px solid red;

	.item {
		height: v-bind(heightStr);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		will-change: transform;
	}
}
</style>

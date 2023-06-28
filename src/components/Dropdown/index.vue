<template>
	<el-dropdown class="dropdown">
		<span class="el-dropdown-link">
			欢迎您：{{ nickname }}
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import userStore from '@/store/user'
import { computed } from 'vue'

const user = userStore()

const logout = () => {
	user.logout()
}

const nickname = computed(() => {
	return localStorage.getItem('nickname')
})
</script>

<style lang="scss" scoped>
.dropdown {
	margin-right: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;

	span {
		margin-right: 15px;
		outline: none;
	}
}
</style>

<template>
	<div class="home-box">
		<div
			class="left-box"
			id="three-render-box"
			v-loading="loading"
			element-loading-background="#000"
		></div>
		<div class="right-box">
			<h1>登录</h1>
			<div class="login-box">
				<el-form
					ref="ruleFormRef"
					:model="state.ruleForm"
					:rules="state.rules"
					class="ruleForm"
					status-icon
					label-width="100px"
				>
					<el-form-item
						label="用户名"
						prop="username"
						class="form-item"
					>
						<el-input v-model="state.ruleForm.username" class="input" />
					</el-form-item>
					<el-form-item
						label="密码"
						prop="password"
						class="form-item"
					>
						<el-input
							v-model="state.ruleForm.password"
							type="password"
							class="input"
						/>
					</el-form-item>
					<el-form-item>
						<el-button
							class="login-button"
							type="primary"
							plain
							@click="submitForm(ruleFormRef)"
						>
							登录
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { init } from './model'
import type { FormInstance } from 'element-plus'
import userStore from '../../store/user'

const loading = ref<boolean>(true)
const ruleFormRef = ref<FormInstance>()
const user = userStore()

onMounted(() => {
	init(loading)
})

const state = reactive<any>({
	ruleForm: {
		username: null,
		password: null,
	},
	rules: {
		username: [
			{ required: true, message: '请填写用户名', trigger: 'blur' },
		],
		password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
	},
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			user.login(state.ruleForm)
		}
	})
}
</script>

<style scoped lang="scss">
$bg-color: #000;

.home-box {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	min-width: 1200px;
	overflow: auto;
	background: $bg-color;

	.left-box {
		width: 65%;
		height: 100%;
	}

	.right-box {
		flex: 1;
		height: 100%;
		background: $bg-color;
		border-left: 1px dashed rgba(255, 255, 255, 0.3);

		h1 {
			width: 100%;
			text-align: center;
			color: #409eff;
			margin-top: 30%;
		}

		.login-box {
			width: 400px;
			height: 250px;
			border: 1px dashed rgba(255, 255, 255, 0.3);
			border-radius: 10px;
			margin: 5% auto 0 auto;
			display: flex;
			justify-content: center;

			.ruleForm {
				width: 100%;
				height: 100%;
				padding-top: 50px;
			}

			.form-item {
				width: 100%;
				display: flex;
				justify-content: center;

				.input {
					width: 90%;
				}
			}

			.login-button {
				width: 90%;
			}
		}
	}
}
</style>

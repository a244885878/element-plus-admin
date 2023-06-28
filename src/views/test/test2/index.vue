<template>
	<div>
		<el-table border :data="tableData" class="table">
			<el-table-column prop="date" label="Date" />
			<el-table-column prop="name" label="Name" />
			<el-table-column prop="address" label="Address" />
		</el-table>
	</div>
</template>

<script setup lang="ts">
const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
]
</script>

<style scoped lang="scss">
.table {
	width: calc(100% - 60px);
	margin: 30px auto;
}
</style>

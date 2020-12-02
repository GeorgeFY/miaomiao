<template>
	<div>
		<el-table :data="nowTableData" border style="width: 100%">
			<el-table-column prop="HeadPic" label="头像">
				<template slot-scope="scope">
					<img :src="scope.row.HeadPic" class="userHead">
				</template>
			</el-table-column>
			<el-table-column prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="username" label="姓名">
			</el-table-column>
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="handelToFreeze(scope.$index,scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
					<el-button type="danger" size="small" @click="handelToDelete(scope.$index,scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="page" background layout="prev, pager, next" :page-size="pageSize" :current-page.sync="currentPage" :total="tableData.length" >
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: "Users",
		data() {
			return {
				tableData: [],
				currentPage:1,
				pageSize:4
			}
		},
		computed:{
			nowTableData(){
				return this.tableData.slice((this.currentPage -1)*this.pageSize,this.currentPage*this.pageSize) || [];
			}
		},
		mounted() {
			this.axios.get('/api/admin/usersList').then((res) => {
				//console.log(res.data)
				var status = res.data.status;
				if (status === 0) {
					this.tableData = res.data.data.usersList;
				}
			})
		},
		methods: {
			handelToFreeze(index, row) {
				//console.log(index,row)
				this.axios.post('/api/admin/updateFreeze', {
					email: row.email,
					isFreeze: !row.isFreeze
				}).then((res) => {
					var status = res.data.status;
					if (status === 0) {
						this.$alert('冻结操作已成功', '信息', {
							confirmButtonText: '确定',
							callback: () => {
								this.tableData[index].isFreeze = !row.isFreeze;
							}
						})
					} else {
						this.$alert('冻结操作失败', '信息', {
							confirmButtonText: '确定'
						})
					}
				})
			},
			handelToDelete(index, row) {
				console.log(index, row)
				this.axios.post('/api/admin/deleteUser', {
					email: row.email,
				}).then((res) => {
					var status = res.data.status;
					if (status === 0) {
						this.$alert('账号删除成功', '信息', {
							confirmButtonText: '确定',
							callback: () => {
								this.tableData.splice(index, 1);
							}
						})
					} else {
						this.$alert('账号删除失败', '信息', {
							confirmButtonText: '确定'
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page{
		margin-top: 20px;
		float: right;
	}
	.userHead{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
	}
</style>

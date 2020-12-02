<template>
	<div>
		<div>个人中心</div> 
		<div>当前用户：{{$store.state.user.name}}  <a href="javascript:;" @click="handelToLogout()">退出</a></div>
		<div v-if="$store.state.user.isAdmin">当前用户身份： 管理员  <a href="/admin" target="_blank">进入管理员后台</a></div>
		<div v-else>当前用户身份： 普通会员</div>
		<div>
			<input type="file" name="file" value="上传头像" @change="handelToUpload">
			<img :src="$store.state.user.HeadPic" class="userHead">
		</div>
	</div>
</template>
	
<script>
	import {messageBox} from '@/components/JS'
	import axios from 'axios'
	export default{
		name:"Center",
		methods:{
			handelToLogout(){
				this.axios.get('/users/logout').then((res)=>{
					var status = res.data.status;
					if(status === 0){
						window.localStorage.removeItem('name')
						window.localStorage.removeItem('isAdmin')
						this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,HeadPic:''})
						this.$router.push('/mine/login')
					}
				})
			},
			handelToUpload(ev){
				var file = ev.target.files[0];
				var param = new FormData();
				param.append('file',file,file.name)
				var config = {
					headers:{
						'content-type':'multipart/form-data'
					}
				}
				this.axios.post('/users/uploadUserHead',param,config).then((res)=>{
					var status = res.data.status;
					var This = this;
					if(status === 0){
						messageBox({
							title:'信息',
							content:'上传头像成功',
							ok:'确定',
							handelOk(){
								This.$store.commit('user/USER_NAME',{
									name:This.$store.state.user.name,
									isAdmin:This.$store.state.user.isAdmin,
									HeadPic:res.data.data.HeadPic + '?' + Math.random()
									})
							}
						})
					}else{
						messageBox({
							title:'信息',
							content:'上传头像失败',
							ok:'确定'
						})
					}
				})
			}
		},
		beforeRouteEnter(to,from,next) {
			axios.get('/users/getUser').then((res)=>{
				var status = res.data.status;
				if(status === 0){
					next(vm=>{
						window.localStorage.setItem('name',res.data.data.username)
						window.localStorage.setItem('isAdmin',res.data.data.isAdmin)
						vm.$store.commit('user/USER_NAME',{
							name:res.data.data.username,
							isAdmin:res.data.data.isAdmin,
							HeadPic:res.data.data.HeadPic})
					});
				}else{
					next('/mine/login')
				}
			})
		}
	}
</script>

<style scoped>
	.userHead{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
	}
</style>

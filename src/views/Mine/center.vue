<template>
	<div>
		<div>个人中心</div> 
		<div>当前用户：{{$store.state.user.name}}  <a href="javascript:;" @click="handelToLogout()">退出</a></div>
		<div v-if="$store.state.user.isAdmin">当前用户身份： 管理员  <a href="/admin" target="_blank">进入管理员后台</a></div>
		<div v-else>当前用户身份： 普通会员</div>
	</div>
</template>
	
<script>
	import axios from 'axios'
	export default{
		name:"Center",
		methods:{
			handelToLogout(){
				this.axios.get('/users/logout').then((res)=>{
					var status = res.data.status;
					if(status === 0){
						this.$store.commit('user/USER_NAME',{name:'',isAdmin:false})
						this.$router.push('/mine/login')
					}
				})
			}
		},
		beforeRouteEnter(to,from,next) {
			axios.get('/users/getUser').then((res)=>{
				var status = res.data.status;
				if(status === 0){
					next(vm=>{
						vm.$store.commit('user/USER_NAME',{name:res.data.data.username,isAdmin:res.data.data.isAdmin})
					});
				}else{
					next('/mine/login')
				}
			})
		}
	}
</script>

<style>
</style>

<template>
	<div>
		管理页面
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'Admin',
		 beforeRouteEnter(to,from,next) {
			axios.get('/api/admin').then((res)=>{
				var status = res.data.status;
				if(status === 0){
					next();
				}else{
					next('/mine/login')
				}
			})
		}
	}
</script>

<style>
</style>

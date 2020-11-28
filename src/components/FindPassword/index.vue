<template>
	<div class="findpassword_body">
		<div class="findpassword_email">
			邮箱： <input v-model="email" type="text" class="findpassword_text"> <button @click="handelToVerify()">发送验证码</button>
		</div>
		<div>
			新密码  <input v-model="password" type="text" class="findpassword_text">
		</div>
		<div>
			验证码  <input v-model="verify" type="text" class="findpassword_text">
		</div>
		<div class="findpassword_btn">
			<button @click="handelToPassword()">修改</button>
		</div>
		<div class="findpassword_link">
			<router-link to="/mine/login">立即登入</router-link>
			<router-link to="/mine/register">立即注册</router-link>
		</div>
	</div>
</template>

<script>
	import {messageBox} from '@/components/JS'
	export default{
		name:"FindPassword",
		data(){
			return{
				email :'',
				password:'',
				verify:''
			}
		},
		methods:{
			handelToVerify(){
				this.axios.get('/users/verify?email='+this.email).then((res)=>{
					var status = res.data.status;
					if(status === 0){
						messageBox({
							title:"验证码",
							content:"验证码已发送",
							ok:"确定"
						})
					}else{
						messageBox({
							title:"验证码",
							content:"验证码发送失败",
							ok:"确定"
						})
					}
				})
			},
			handelToPassword(){
				this.axios.post('/users/findPassword',{
					email:this.email,
					password:this.password,
					verify:this.verify
				}).then((res)=>{
					var status = res.data.status;
					var This = this;
					if(status === 0){
						messageBox({
							title:"修改密码",
							content:"修改密码成功",
							ok:"确定",
							handelOk(){
								This.$router.push('/mine/login')
							}
						})
					}else{
						messageBox({
							title:"修改密码",
							content:"修改密码失败",
							ok:"确定",
							handelOk(){
								This.$router.push('/mine/login')
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	#content .findpassword_body {
		width: 100%;
	}
	
	.findpassword_body .findpassword_text {
		width: 100%;
		height: 40px;
		border: none;
		border-bottom: 1px #ccc solid;
		margin-bottom: 5px;
		outline: none;
		text-indent: 10px;
	}
	
	.findpassword_body .findpassword_btn {
		height: 50px;
		margin: 10px;
	}
	
	.findpassword_body .findpassword_btn button {
		width: 100%;
		height: 100%;
		background: #e54847;
		border-radius: 3px;
		border: none;
		display: block;
		color: white;
		font-size: 20px;
	}
	
	.findpassword_body .findpassword_link {
		display: flex;
		justify-content: space-between;
	}
	
	.findpassword_body .findpassword_link a {
		text-decoration: none;
		margin: 0 5px;
		font-size: 12px;
		color: #e54847;
	}
	.findpassword_body .findpassword_email{position: relative;}
	.findpassword_body .findpassword_email button{position: absolute;right: 10px;top: 10px;height: 30px;border-radius: 3px;border: none;padding: 5px;background-color: #007AFF;}
</style>

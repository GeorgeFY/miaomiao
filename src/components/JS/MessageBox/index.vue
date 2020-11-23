<template>
	<div class="MessageBox">
		<h2>{{title}}</h2>
		<p>{{content}}</p>
		<div>
			<div @click="handelCancel">{{cancel}}</div>
			<div @click="handelOk">{{ok}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"MessageBox"
	}
</script>

<style scoped>
	.MessageBox{
		width: 200px;
		height: 120px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #C9C9C9;
		box-shadow: #C9C9C9 3px 3px 3px 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -60px 0 0 -100px;
	}
	.MessageBox h2{text-align: center;line-height: 40px;font-size: 18px;}
	.MessageBox p{text-align: center;line-height: 40px;}
	.MessageBox > div{
		display: flex;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #C9C9C9;
	}
	.MessageBox > div div{
		flex: 1;
		text-align: center;
		line-height: 30px;
		border-right: 1px solid #C9C9C9;
	}
	.MessageBox >div div:last-child{border: none;}
</style>

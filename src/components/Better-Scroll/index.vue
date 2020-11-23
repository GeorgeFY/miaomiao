<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
	  handelToScroll:{
		  type:Function,
		  default:function(){
			  
		  }
	  },
	  handelToTouchEnd:{
		  type:Function,
		  default:function(){
			  
		  }
	  }
  },
  mounted() {
	console.log(this.$refs.wrapper.clientHeight,"wrapper")
	setTimeout(()=>{
		var scroll = this._initScroll()
		//scroll现在是一个局部对象，给this添加一个属性scroll
		this.scroll = scroll
		scroll.on('scroll',(pos)=>{
			this.handelToScroll(pos)
		})
		scroll.on('touchEnd',(pos)=>{
			this.handelToTouchEnd(pos)
		})
	},1000)
	
  },
  methods:{
	  _initScroll(){
	    return new BScroll(this.$refs.wrapper, {
		 tap: true,
		 click: true,
		 probeType: 1
	   });
	  },
	  toScrollTop(y){
		  this.scroll.scrollTo(0,y);
	  }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>

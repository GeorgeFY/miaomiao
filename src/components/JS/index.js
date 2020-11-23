import Vue from "vue"
import MessageBox from "./MessageBox"

export var messageBox = (function(){
	
	return function(opts){//配置参数
		var defaults={ //默认值
			title:'',
			content:'',
			cancel:'',
			ok:'',
			handelCancel:null,
			handelOk:null
		}
		var MyCompent = Vue.extend(MessageBox)
		console.log(MyCompent,"yuanfang  Mycompent")
		
		for(var attr in opts){
			defaults[attr] = opts[attr]
		}
		
		var vm = new MyCompent({
			el:document.createElement('div'),
			data:{
				title:defaults.title,
				content:defaults.content,
				cancel:defaults.cancel,
				ok:defaults.ok
			},
			methods:{
				handelCancel(){
					defaults.handelCancel && defaults.handelCancel.call(this)
					document.body.removeChild(vm.$el)  //删除节点后，这些属性还存在内存中吗？  在  节点删除后，只是el 没有了  相当于messageBox这个div没有了  但是 defaults里面都已经被赋值了
					//console.log(defaults.title)
				},
				handelOk(){
					defaults.handelOk &&defaults.handelOk.call(this)
					document.body.removeChild(vm.$el)
				}
			}
		})
		document.body.appendChild(vm.$el)
	}
})()
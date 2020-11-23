<template>
  <div class="city_body">
	  <Loading v-if="isLoading"></Loading>
    <div class="city_list" ref="city_list">
      <Scroll ref="city_scroll">
		  <div>
			  <div class="city_hot" ref="city_hot">
			    <h2>热门城市</h2>
			    <ul class="clearfix">
			      <li v-for="data in hotdatalist" :key="data.id" @click="handelToCity(data.nm,data.id)">
			        {{ data.nm }}
			      </li>
			    </ul>
			  </div>
			  <div class="city_sort" ref="city_sort">
			    <div v-for="data in datalist" :key="data.index">
			      <h2 ref="h2">{{ data.index }}</h2>
			      <ul>
			        <li v-for="data in data.list" :key="data.id" @click="handelToCity(data.nm,data.id)">{{ data.nm }}</li>
			      </ul>
			    </div>
			  </div>
		  </div>
	  </Scroll>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(data, index) in datalist"
          :key="data.index"
          @touchstart="handleToIndex(index)"
        >
          {{ data.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      datalist: [],
      hotdatalist: [
        { id: "1", nm: "北京", py: "beijing" },
        { id: "10", nm: "上海", py: "shanghai" },
        { id: "20", nm: "广州", py: "guangzhou" },
        { id: "30", nm: "深圳", py: "shenzhen" }
      ],
	  isLoading:true
    };
  },
  mounted() {
	  
	  var datalist = window.localStorage.getItem('datalist')
	  var hotList = window.localStorage.getItem('hotList')
    //console.log(1111111111111);
	
	if(datalist && hotList){
		this.datalist = JSON.parse(datalist)
		this.hotdatalist = JSON.parse(hotList)
		this.isLoading = false;
	}else{
		//console.log("https://m.maizuo.com/gateway?k=8346595");
		this.axios.get("/dianying/cities.json").then(res => {
		  // console.log(res.data.cts)
		  if (res.data.cts.length != 0) {
			this.datalist = this.handelCity(res.data.cts);
			this.isLoading = false
			
			window.localStorage.setItem('datalist',JSON.stringify(this.datalist))
			window.localStorage.setItem('hotList',JSON.stringify(this.hotdatalist))
		  }
		});
	}
  },
  methods: {
    handelCity(data) {
      var letterArr = [];
      for (var i = 65; i <= 90; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      // console.log(letterArr)

      var newList = [];
      for (var j = 0; j < letterArr.length; j++) {
        var arr = data.filter(
          item => item.py.substring(0, 1) === letterArr[j].toLowerCase()
        );
        //  console.log(arr)
        if (arr.length > 0) {
          newList.push({
            index: letterArr[j],
            list: arr
          });
        }
      }
      // console.log(newList)
      return newList;
    },
    handleToIndex(index) {
      //点击右边索引值 找到对应左边的索引值  计算属性  ref可以得到
      //var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      //console.log(h2[index].offsetTop)
      /* console.log(this.$refs.h2[index].offsetTop);
      this.$refs.city_list.scrollTop = this.$refs.h2[index].offsetTop; */
	  this.$refs.city_scroll.toScrollTop(-this.$refs.h2[index].offsetTop)
    },
	handelToCity(nm,id){
		this.$store.commit('city/CITY_INFO',{nm,id})
		window.localStorage.setItem('NowCitynm',nm)
		window.localStorage.setItem('NowCityId',id)
		this.$router.push('/movie/nowplaying')
	}
  }
};
</script>

<style>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
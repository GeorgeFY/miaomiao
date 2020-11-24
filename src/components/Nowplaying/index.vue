<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroll
      v-else
      :handelToScroll="handelToScroll"
      :handelToTouchEnd="handelToTouchEnd"
    >
      <ul ref="ul">
        <li v-for="data in datalist" :key="data.id">
          <div class="pic_show" @click="handleToDetail(data.id)">
            <img :src="data.img | SetWH('128.180')" />
          </div>
          <div class="info_list" @click="handleToDetail(data.id)">
            <h2>
              {{ data.nm }}
              <img v-if="data.version" src="@/assets/maxs.png" alt="" />
            </h2>
            <p>
              观众评 <span class="grade">{{ data.sc }}</span>
            </p>
            <p>主演: {{ data.star }}</p>
            <p>{{ data.showInfo }}</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
        <li class="pulldown">{{ pullDownMsg }}</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
export default {
  name: "Nowplaying",
  data() {
    return {
      datalist: [],
      AlldataId: [],
      pullDownMsg: "",
	  isLoading:true
    };
  },
  mounted() {
	  //console.log(this.$refs.movie_body.clientHeight,"movie-body")
	  //console.log(this.$refs.ul.clientHeight,"ul")
	  console.log("yuan")
    this.axios
      .get(
        "/ajax/movieOnInfoList?token=&optimus_uuid=3BD00ED02B9311EB83CBCBE2BA8F0E0C6093BDE586664C92BC95CB0254E22EC9&optimus_risk_level=71&optimus_code=10"
      )
      .then(res => {
         console.log(res.data);
        this.datalist = res.data.movieList;
        this.AlldataId = res.data.movieIds;
		this.isLoading = false
        //console.log(this.AlldataId)
        /* this.$nextTick(()=>{
				 var scroll = new BScroll(this.$refs.movie_body,{
					scrollbar: {
					  // fade: true,
					  // interactive: false
					},
					click:true,
					//scrolly:true,
					probeType: 1
				})
				scroll.on('scroll',(pos)=>{
					var ul = this.$refs.movie_body.getElementsByTagName('ul')
					//console.log(ul)
					//console.log(ul.[0].clientHeight)
					//console.log(ul)
					//console.log(-pos.y)
					//console.log("yuan",ul.[0].clientHeight)
					//console.log(this.$refs.movie_body.clientHeight)
					if(-pos.y > ul.[0].clientHeight-this.$refs.movie_body.clientHeight){
						this.pullDownMsg = "正在更新中"
						console.log("正在更新中")
					}
					//console.log("now is scroll yuan")
				})
				scroll.on('touchEnd',(pos)=>{
					var ul = this.$refs.movie_body.getElementsByTagName('ul')
					console.log(ul.[0].clientHeight)
					if(-pos.y > ul.[0].clientHeight-this.$refs.movie_body.clientHeight){
						console.log("500begin")
						this.axios
						  .get(
							"/ajax/moreComingList?token=&movieIds=1197684%2C342574%2C1203282%2C1216140%2C1242224%2C1285581%2C345809%2C1211269%2C367835%2C1218021&optimus_uuid=CBAE5EA02C4511EB8341979D91B7B56EEA64B15F94774EC39CBF422D4100408F&optimus_risk_level=71&optimus_code=10"
						  )
						  .then(res => {
							 //console.log(res.data);
						   this.pullDownMsg="更新成功"


						   this.datalist =this.datalist.concat(res.data.coming);
							   //this.AlldataId = res.data.movieIds;
							   //console.log(this.datalist)
							this.pullDownMsg=""

						  });
					}
				})
			})*/
      });
  },
  methods: {
    handleToDetail(MovieId) {
      //console.log(MovieId);
	  this.$router.push("/movie/detail/1/"+MovieId)
    },
	handelToScroll(pos){
		var ul = this.$refs.movie_body.getElementsByTagName('ul')
		if(-pos.y > ul.[0].clientHeight-this.$refs.movie_body.clientHeight){
			this.pullDownMsg = "正在更新中"
			console.log("正在更新中")
		}
	},
	handelToTouchEnd(pos){
		var ul = this.$refs.movie_body.getElementsByTagName('ul')
		// console.log(ul.[0].clientHeight)
		if(-pos.y > ul.[0].clientHeight-this.$refs.movie_body.clientHeight){
			console.log("500begin")
			this.axios
			  .get(
				"/ajax/moreComingList?token=&movieIds=1197684%2C342574%2C1203282%2C1216140%2C1242224%2C1285581%2C345809%2C1211269%2C367835%2C1218021&optimus_uuid=CBAE5EA02C4511EB8341979D91B7B56EEA64B15F94774EC39CBF422D4100408F&optimus_risk_level=71&optimus_code=10"
			  )
			  .then(res => {
			   this.pullDownMsg="更新成功"
			   this.datalist =this.datalist.concat(res.data.coming);
				this.pullDownMsg=""

			  });
		}
	}
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pulldown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>

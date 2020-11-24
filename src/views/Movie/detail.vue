<template>
  <Loading v-if="isLoading"></Loading>
  <Scroll v-else>
    <div id="detailContrainer" class="slide-enter-active">
      <Header title="影片详情">
        <i class="iconfont icon-right" @click="handelToBack"></i>
      </Header>
      <div id="content" class="contentDetail">
        <div class="detail_list">
          <div class="detail_list_bg" :style="{'background-image' : 'url('+ datalist.img.replace(/w\.h/,'148.208') +')' }"></div>
          <div class="detail_list_filter"></div>
          <div class="detail_list_content">
            <div class="detail_list_img">
              <img :src="datalist.img | SetWH('148.208')" alt="" />
            </div>
            <div class="detail_list_info">
              <h2>{{ datalist.nm }}</h2>
              <p>{{ datalist.enm }}</p>
              <p>{{ datalist.sc }}</p>
              <p>{{ datalist.cat }}</p>
              <p>{{ datalist.src }}/{{ datalist.pn }}分钟</p>
              <p>{{ datalist.pubDesc }}</p>
            </div>
          </div>
        </div>
        <div class="detail_intro">
          <p>{{ datalist.dra }}</p>
        </div>
        <Swiper perview= "4" class="actorSwiper" myclass = "actorSwiper">
			<div class="swiper-slide" v-for="(data,index) in datalist.photos" :key="index">
			  <div class="actorPic">
			    <img :src="data | SetWH('140.127')">
			  </div>
			</div>
		</Swiper>
      </div>
    </div>
  </Scroll>
</template>

<script>
import Header from "@/components/Header";
import Swiper from "@/components/Swiper"
export default {
  name: "Detail",
  components: {
    Header,
	Swiper
  },
  data() {
    return {
      datalist: {},
      isLoading: true
    };
  },
  props: ["MovieId"],
  mounted() {
    //console.log("获取ID",this.$route.params.MovieId)
    console.log(this.MovieId);
    var MovieId = this.MovieId;
    this.axios
      .get(
        "/ajax/detailmovie?movieId=" +
          MovieId +
          "&optimus_uuid=3BD00ED02B9311EB83CBCBE2BA8F0E0C6093BDE586664C92BC95CB0254E22EC9&optimus_risk_level=71&optimus_code=10"
      )
      .then(res => {
        console.log(res.data.detailMovie);
        this.datalist = res.data.detailMovie;
		console.log(this.datalist)
        this.isLoading = false;
      });
  },
  methods: {
    handelToBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
  min-height: 100%;
  width: 100%;
  z-index: 100;
}
.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.actorPic{
	width: 100%;
	height: 60px;
	overflow: hidden;
}
</style>

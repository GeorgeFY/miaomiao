<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"></Loading>
    <Scroll>
      <ul>
        <li v-for="data in CinemaList" :key="data.cinemaId">
          <div>
            <span>{{ data.name }}</span>

            <span class="price"
              >{{ getPrice(data.lowPrice) }}<span class="q">元起</span></span
            >
          </div>
          <div class="address">
            <span class="line-ellipsis">{{ data.address }}</span>
            <span>{{ getDistance(data.Distance) }}km</span>
          </div>
          <div class="card">
            <div>小吃</div>
            <div>折扣卡</div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
export default {
  name: "CinemaList",
  data() {
    return {
      CinemaList: [],
      isLoading: true,
      prevCityId: -1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId) {
      return;
    }
    this.isLoading = true;

    this.axios({
      url:
        "https://m.maizuo.com/gateway?cityId=" +
        110100 +
        "&ticketFlag=1&k=391939",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1605514300459406881849345","bc":"110100"}',
        "X-Host": "mall.film-ticket.cinema.list"
      }
    }).then(res => {
      //console.log(res.data)
      this.CinemaList = res.data.data.cinemas;
      this.isLoading = false;
    });
  },
  methods: {
    getDistance(num) {
      // console.log(num);
      var numStr = num.toString();
      if (numStr.length > 4) {
        numStr = numStr.substring(0, 4);
      }
      return numStr;
    },
    getPrice(num) {
      // console.log(num);
      var numStr = num.toString();
      if (numStr.length > 2) {
        numStr = numStr.substring(0, 2);
      }
      return numStr;
    }
  }
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
  margin-left: 4px;
}

.cinema_body .price {
  font-size: 18px;
  float: right;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address .line-ellipsis {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>

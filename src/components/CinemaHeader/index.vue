<template>
  <div class="cinema_menu">
    <div>全城 <i class="iconfont icon-lower-triangle"></i></div>
    <div>品牌 <i class="iconfont icon-lower-triangle"></i></div>
    <div>特色 <i class="iconfont icon-lower-triangle"></i></div>
  </div>
</template>

<script>
export default {
  name: "CinemaHeader"
};
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
</style>

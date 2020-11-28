<template>
  <div id="main">
    <Header title="个人中心"></Header>
    <div id="content">
		<Router-view></Router-view>
	</div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default {
  name: "Mine",
  components: {
    Header,
    TabBar
  }
};
</script>

<style></style>

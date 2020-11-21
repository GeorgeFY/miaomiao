<template>
  <div id="main">
    <Header title="喵喵影院"></Header>
    <div id="content">
      <CinemaHeader></CinemaHeader>
      <keep-alive>
        <CinemaList></CinemaList>
      </keep-alive>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import CinemaHeader from "@/components/CinemaHeader";
import CinemaList from "@/components/CinemaList";
export default {
  name: "Cinema",
  components: {
    Header,
    TabBar,
    CinemaHeader,
    CinemaList
  }
};
</script>

<style></style>

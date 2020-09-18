<template>
  <div id="home">
    <!-- 导航条开始 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图开始 -->
    <home-swiper :banners="banners"></home-swiper>

    <!-- 推荐 -->
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView"

import { getHomeMutidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1.请求我们的多个数据
    getHomeMutidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
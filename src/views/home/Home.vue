<template>
  <div id="home">
    <!-- 导航条开始 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="scrollContent"  
            ref="scroll" 
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :probe-type="3" 
            :pull-up-load="true">
      <!-- 轮播图开始 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature></feature>
      <!-- 控制栏 -->
      <tab-control :titles="['流行','新款','精选']" @tab-click="tabControlClick"></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import Feature from "./childComps/Feature";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backtop/BackTop"

import { getHomeMutidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    Feature,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false
    };
  },
  created() {
    // 1.请求我们的多个数据
    this.getHomeMutidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },

  },
  methods: {
    /*
      事件监听相关
    */
    tabControlClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backTopClick(){
      // 通过 ref 直接访问scroll组件里的scrollTo方法
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(index){
      // 判断当前位置来确定是否显示返回顶部按钮
      this.isShowBackTop = (-index) > 1000;
    },
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    finishPullUp(){
      // 重新计算可滚动的高度 避免出现有内容 但是拉不动的情况
      this.$refs.scroll.scroll.refresh();
      // 框架的下拉加载更多 回调函数
      this.$refs.scroll.scroll.finishPullUp();
    },
    /*
      网络请求相关
    */
    getHomeMutidata() {
      getHomeMutidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 当前页的 下一页
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //数组的解构赋值 把新请求到的数组追加到变量中
        this.goods[type].list.push(...res.data.list); 
        // 把最新页数更新到对象
        this.goods[type].page += 1;

        //如果获取到数据 调用框架的finishPullUp() 让它能够执行下一次下拉加载更多
        this.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
.scrollContent{
  height: calc(100vh - 93px);
  /* height: 300px; */
  overflow: hidden;
}
</style>
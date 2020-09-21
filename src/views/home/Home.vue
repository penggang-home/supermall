<template>
  <div id="home">
    <!-- 导航条开始 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tabControlShowHide"
      v-show="isTabFixed"
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tab-click="tabControlClick"
    ></tab-control>
    <scroll
      class="scrollContent"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :probe-type="3"
      :pull-up-load="true"
    >
      <!-- 轮播图开始 -->
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature></feature>
      <!-- 控制栏 -->
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tab-click="tabControlClick"></tab-control>
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
import BackTop from "components/common/backtop/BackTop";

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
    BackTop,
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backTopClick() {
      // 通过 ref 直接访问scroll组件里的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position) {
      // 1.判断当前位置来确定是否显示返回顶部按钮
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶
      this.isTabFixed = this.tabOffsetTop <= -position.y + 44;
    },

    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性 $el,用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        this.$refs.scroll && this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  created() {
    // 1.请求我们的多个数据
    this.getHomeMutidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完成的事件监听
    this.$refs.scroll.scrollTo(0, this.saveY, 0);

    this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll && this.$refs.scroll.refresh();
    });
  },
  // 进入本组件时触发
  activated() {
    //一进入组件就滚动到离开时保存的位置
    this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
    //refresh():重新计算 better-scroll,
    this.$refs.scroll && this.$refs.scroll.refresh();
  },

  deactivated() {
    //离开本组件时触发

    //1、保存离开时的位置
    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 使用原生滚动需要定位 换为better-scroll就不需要了 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 10;
}
.scrollContent {
  height: calc(100vh - 93px);
  overflow: hidden;
}
.tabControlShowHide {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
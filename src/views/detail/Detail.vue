<template>
  <div id="detail">
    <detail-nav-bar ref="navBar" @NavBarClick="NavBarClick" class="detail-nav-bar" />
    <scroll
      class="detail-content"
      ref="scroll"
      :pull-up-load="true"
      @scroll="contentscroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="Recommend" ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
// 封装的子组件
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

// 封装的公共组件
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

// 封装的工具函数
import {
  getDetail,
  GooodsInfo,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    Scroll, //better-scroll
    DetailNavBar, //顶部导航栏
    DetailSwiper, //轮播图
    DetailBaseInfo, //商品信息
    DetailShopInfo, //店铺信息
    DetailGoodsInfo, //商品详情数据
    DetailParamInfo, //尺码信息
    DetailCommentInfo, //评论信息
    GoodsList, //推荐信息
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}, //评论信息
      Recommend: [], //推荐信息
      themeTopY: [], //距离顶部的offsetTop
      currentIndex: 0,
    };
  },
  methods: {
    // 1.DetailGoodsInfo里已经做过防抖处理
    imageLoad() {
      this.$refs.scroll.refresh();

      if (this.themeTopY != []) {
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE); //方便后边判读 提高运算速度
      }
      console.log(this.themeTopY);
    },

    // 2.导航栏点击
    NavBarClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index] + 44, 0);
    },
    // 3.监听页面滚动 并且更新子组件选中状态
    contentscroll(position) {
      // 1.获取Y值
      const positionY = -position.y + 44;

      // 2. positionY和导航栏的值经进行对比

      //这种方法不够灵活，而且调用频繁
      // if (positionY >= 0 && positionY < this.themeTopY[1]) {
      //   this.NavBarCurrentIndex = 0;
      // } else if (
      //   positionY >= this.themeTopY[1] &&
      //   positionY < this.themeTopY[2]
      // ) {
      //   this.NavBarCurrentIndex = 1;
      // } else if (
      //   positionY >= this.themeTopY[2] &&
      //   positionY < this.themeTopY[3]
      // ) {
      //   this.NavBarCurrentIndex = 2;
      // } else {
      //   this.NavBarCurrentIndex = 3;
      // }

      //大神写法
      for (let i = 0; i < this.themeTopY.length - 1; i++) {
        if (
          this.NavBarCurrentIndex !== i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          //更新子组件状态
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
    },
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new GooodsInfo(data.itemInfo, data.columns, data.shopInfo);

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息  有些有有些没有因此需要判断
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求详情页的推荐数据
    getRecommend().then((res) => {
      this.Recommend = res.data.list;
    });
  },

  mounted() {
    this.$bus.$on("DetailItemImageLoad", () => {
      this.$refs.scroll && this.$refs.scroll.refresh();
    });
  },
};
</script>

<style>
#detail {
  position: relative;
  z-index: 1000;
  background-color: white;
}
.detail-nav-bar {
  position: relative;
  z-index: 1000;
  background-color: #fff;
}
.detail-content {
  height: calc(100vh - 44px);
}
</style>
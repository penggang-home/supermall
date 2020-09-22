<template>
  <div class="detail-nav-bar-shadow">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/backWhite.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          @click="titleItemClick(index)"
          :class="{active: index == currentIndex}"
          v-for="(item,index) in titles"
          :key="index"
        >{{item}}</div>
      </div>
      <div slot="right" class="right">
        <img src="~assets/img/common/shopcartWhite.svg" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailTopShadow",
  components: {
    NavBar,
  },
  data() {
    return {
      // titles: ["商品", "参数", "评论", "推荐"],
      titles: [],
      currentIndex: 0,
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      this.$emit("NavBarClick",index)
    },
    backClick(){
      this.$router.back();
    }
  },
};
</script>

<style>
.title {
  display: flex;
}
.title-item {
  font-weight: 500;
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
.left{
  display: flex;
  justify-content: center;
  align-content: center;
}
.detail-nav-bar-shadow {
  position: absolute;
  z-index: 900;
  left: 0;
  right: 0;
  transition: opacity .3s;
}
.nav-bar{
  box-shadow: 0 0 0 0;
}
</style>
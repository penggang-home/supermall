<template>
  <!-- 轮播图开始 -->
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
  <!-- 轮播图结束 -->
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: [Array],
      default() {
        return [];
      },
    },
  },
  methods: {
    imageLoad() {
      this.$emit("swiperImageLoad");
    },
  },
};
</script>

<style>
</style>
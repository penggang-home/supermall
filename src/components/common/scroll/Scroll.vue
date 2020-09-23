<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  props: {
    probeType: {
      type: Number,
      default: 0, //默认不开启
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  // 组件创建完后调用
  mounted() {
    // 1.创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, //开启实时监听滚动位置
      click: true,
      mouseWheel: false, //关闭鼠标滚轮滚动
      pullUpLoad: this.pullUpLoad, //上拉加载更多
    });

    // 2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 3.监听上拉加载更多事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    // 1.调用better-scroll 的scrollTo方法 返回顶部
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
    // 2.重新计算内容高度
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 3.下拉加载更多的回调函数
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
      this.scroll && this.scroll.refresh();
    },
    // 4.获取当前所在高度
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>

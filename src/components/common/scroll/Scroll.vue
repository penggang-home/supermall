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
      default: 1, //默认不开启
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
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log('position: ', position);
      this.$emit("scroll", position.y);
    });

    // 3.监听上拉加载更多事件
    this.scroll.on("pullingUp", () => {
      this.$emit('pullingUp')
      //调用一次这个函数，才能触发下一次。
      //  this.scroll.finishPullUp();
    });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      // 调用better-scroll 的scrollTo方法 返回顶部
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>

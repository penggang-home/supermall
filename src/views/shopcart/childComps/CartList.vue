<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
// 封装的公共组件
import Scroll from "components/common/scroll/Scroll";
// 封装的子组件
import CartListItem from "./CartListItem"
// 封装的工具函数
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  // 进入的时候
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.content{
  height: calc(100vh - 134px);
  overflow: hidden;
}
</style>
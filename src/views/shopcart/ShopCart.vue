<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" @click="modify">{{modifyStr}}</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar :is-modify="isModify"/>
  </div>
</template>

<script>
// 封装的公共组件
import NavBar from "components/common/navbar/NavBar";

// 封装的子组件
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

// 封装的工具函数
import { mapGetters } from "vuex";

export default {
  name: "ShopCart",
  components: {
    NavBar,//导航
    CartList,//商品列表
    CartBottomBar,//底部工具栏
  },
  data() {
    return {
      isModify:false
    }
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
    }),
    modifyStr(){
      return this.isModify ? '完成' : '管理'
    }
  },
  methods: {
    modify(){
      this.isModify = !this.isModify
    }
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
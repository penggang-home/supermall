<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
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
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavaBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
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
  /* justify-content: space-between; */
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
</style>
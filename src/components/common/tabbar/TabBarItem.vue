<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  computed: {
    isActive(){
      // return this.$route.path == this.path

      //indexOf 如果此字符串中没有这样的字符，则返回 -1。
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
};
</script>

<style>
.tab-bar-item {
  text-align: center;
  flex: 1;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>
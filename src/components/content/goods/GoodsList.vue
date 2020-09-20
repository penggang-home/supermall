<template>
  <div class="goods">
    <goods-list-item :key="index" v-for="(item,index) in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  /* column-count: 2;
  column-gap: 0; */

  /* display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 1000px; */
}
</style>
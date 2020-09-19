<template>
  <div class="tab-control">
    <div
      :key="index"
      v-for="(item,index) in titles"
      :class="{active:index === currentIndex}"
      class="tab-control-item"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tab-click',this.currentIndex)
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-tint);
  border-radius: 1px;
}
</style>
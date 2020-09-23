<template>
  <div class="check-button">
    <img v-if="isChecked" src="~assets/img/cart/checked.png" alt />
    <img v-else src="~assets/img/cart/no-checked.png" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.check-button {
  border-radius: 50%;
}
.check-button img{
  width: 21px;
  height: 21px;
}
</style>
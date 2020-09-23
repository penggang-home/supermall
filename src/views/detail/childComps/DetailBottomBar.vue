<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="detail-menu ">
        <div class="cart cart-and-buy" @click="addToCart">加入购物车</div>
        <div class="buy cart-and-buy">点击购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(){
      this.$emit('addToCart')
    }
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 49px;
  position: relative;
  left: 0;
  right: 0;
  bottom: 0px;
  background-color: #fff;
  display: flex;
  text-align: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 0px;
  background: url("~assets/img/detail/detail_bottom.png");
  background-size: 100%;
}

.bar-left .service {
  background-position: 0 -54px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-and-buy {
  height: 35px;
  width: 80px;
  line-height: 35px;
  font-size: 13px;
  color: white;
  font-weight: 500;
}
.cart {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  /* background-color: yellow; */
  background-image: linear-gradient(to right, #FFC500, #FF9402);
}
.buy {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  /* background-color: pink; */
  background-image: linear-gradient(to right, #FF7A00, #FE560A);
}
</style>
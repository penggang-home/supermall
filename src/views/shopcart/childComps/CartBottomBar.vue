<template>
  <div class="bottom-bar">
    <div class="allChecked" @click="checkAllClick">
      <check-button :is-checked="allCheckedState" />
      <span>全选</span>
    </div>
    <div class="cart-total">
      合计:
      <span class="total-price">{{totalPrice}}</span>
    </div>
    <div class="cart-submit" @click="submit">
      <span class="submit" :class="{hide:checkLength == 0}">
        结算
        <span>({{checkLength}})</span>
      </span>
    </div>
  </div>
</template>

<script>
// 公共组件
import CheckButton from "components/content/checkbutton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkAllClick() {
      if (this.allCheckedState) {
        //全部选中改为不选中
        this.$store.getters.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分或全部选中 改为不选中
        this.$store.getters.cartList.forEach((item) => (item.checked = true));
      }
    },
    submit() {
      // this.$toast.show("购买成功", 1500);
      if(this.checkLength === 0){
        this.$toast.show('请选择宝贝哦~')
      }
    },
  },
  computed: {
    // 总价格
    totalPrice() {
      // 先返回选中的商品，再累加各个商品的总价(数量*单价)
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue += item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    // 当前准备结算的商品个数
    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    // 判断是否全部选中 数字取反都返回 false 只有0,-0返回true
    allCheckedState() {
      // 方案一
      // return !this.$store.state.cartList.filter(item => {
      //   return item.checked == false
      // }).length

      // 方案二
      // 如果找到数据则返回对象 对象取反返回false  没找到数据返回undefined undefined取反返回true
      // return !this.$store.state.cartList.find(item => item.checked == false)

      // 方案三
      // 判断总长度是否等于选中的长度
      if (this.$store.state.cartList.length === 0) {
        return false;
      } else {
        return this.$store.state.cartList.length == this.checkLength;
      }
    },
  },

};
</script>

<style scoped>
.bottom-bar {
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.5);
  height: 40px;
  position: relative;
  left: 0;
  right: 0;
  padding: 0 5px;
}
.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.allChecked {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.allChecked .check-button img {
  width: 18px;
  height: 18px;
}
.allChecked span {
  padding-left: 2px;
}
.cart-total {
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cart-submit {
  flex: 1;
}
.total-price {
  color: #ff5000;
}
.submit {
  background-image: -webkit-linear-gradient(left, #ff9000 0%, #ff5000 98%);
  background-image: linear-gradient(90deg, #ff9000 0%, #ff5000 98%);
  font-size: 15px;
  line-height: 15px;
  padding: 8px 18px;
  text-align: center;
  border-radius: 80px;
  color: #ffffff;
  white-space: nowrap;
  margin-left: 10px;
}
.hide {
  color: rgba(255, 255, 255, 0.5);
}
</style>
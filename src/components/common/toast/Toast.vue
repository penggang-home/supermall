<template>
  <div class="toast" v-show="isShow">
    <div>
      <div v-if="!isLoadding">{{ message }}</div>
      <div v-else class="toast-img">
        <img src="./img/loadding.gif" alt="" />
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
      isLoadding: false,
    };
  },
  methods: {
    // 文子 延迟时间 是否显示loadding图片
    show(message, timer = 1500, loadding = 'false') {
      if (loadding == 'false') {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
        }, timer);
      } else {
        this.isLoadding = loadding;
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isLoadding = false;
          this.isShow = false;
        }, timer);
      }
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  z-index: 999999;
  left: 50%;
  top: 45%;
  transition: all 0.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 8px;
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  max-width: 200px;
}
.toast-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast-img img {
  width: 30px;
  height: 30px;
}
</style>
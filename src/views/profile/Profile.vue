<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <user-info :avatar="avatar" />
    <account-info />
    <normal-list-view :list-data="orderList" />
    <normal-list-view :list-data="serviceList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import UserInfo from "./childComponents/UserInfo";
import AccountInfo from "./childComponents/AccountInfo";
import NormalListView from "./childComponents/NormalListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView,
  },
  data() {
    return {
      avatar:'avatar.svg',
      orderList: [
        { icon: "message.svg", info: "消息" },
        { icon: "pointer.svg", info: "积分" },
        { icon: "vip.svg", info: "VIP会员专属" },
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" },
        { icon: "settings.svg", info: "设置" },
      ],
    };
  },
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

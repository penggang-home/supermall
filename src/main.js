import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false

// 使用图片懒加载 需要先 cnpm install vue-lazyload --save-dev 安装插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/lazyload/loadding.svg'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('./assets/img/lazyload/error.svg')  //加载失败图片
});

// 自定义事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')




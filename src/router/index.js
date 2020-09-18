import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Shopcart = () => import('views/shopcart/ShopCart.vue')
const Profile = () => import('views/profile/Profile.vue')


// 1.安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/shopcart",
    component: Shopcart
  },
  {
    path: "/profile",
    component: Profile
  },
]

// 2.创建VueRouter
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
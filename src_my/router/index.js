/**
 * 路由器核心管理模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
const Msite = () =>
    import ('../pages/Msite/Msite.vue')
const Search = () =>
    import ('../pages/Search/Search.vue')
const Order = () =>
    import ('../pages/Order/Order.vue')
const Profile = () =>
    import ('../pages/Profile/Profile.vue')



import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

//向外默认暴露一个VueRouter对象
export default new VueRouter({
    routes: [
        //n个路由
        {
            path: '/msite',
            component: Msite, //返回路由组件的函数，只有执行此函数才会加载路由组件，这个函数在请求对应的路由路径时才会执行
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/',
            redirect: '/msite'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/shop',
            component: Shop,
            children: [{
                    path: 'shopgoods',
                    component: ShopGoods
                },
                {
                    path: 'shopratings',
                    component: ShopRatings
                },
                {
                    path: 'shopinfo',
                    component: ShopInfo
                },
                {
                    path: '',
                    redirect: 'shopgoods'
                }
            ]
        }
    ]
})
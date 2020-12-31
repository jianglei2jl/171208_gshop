/*
入口文件
*/

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer' //y引入mockServer
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'
Vue.use(VueLazyload, { //内部自定义一个指令lazy，使用的时候直接在组件里用v-lazy就行
    loading
})

new Vue({
    el: '#app',
    render: h => h(App),
    router, //注册使用vue-router路由器
    store //注册使用vuex管理状态
    // render(h){
    //     return h(App)
    // }
    // components:{
    //     App
    // },
    // template:'<App/>'
})
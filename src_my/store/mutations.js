//直接更新状态的对象
import {
    RECEIVE_ADDERSS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREAMENT_FOOD_COUNT,
    DECREAMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_LIST
} from './mutation-types'

import Vue from 'vue'
export default {
    [RECEIVE_ADDERSS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },

    //将获取的mockjs数据直接更新到状态
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [INCREAMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            // food.count = 1   //新增属性，没有数据绑定
            /**
             * 对象
             * 属性名
             * 属性值
             */
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        } else {
            food.count++
        }

    },
    [DECREAMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count--
                if (food.count === 0) {
                    //将food从cartFoods中删除
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                }
        }
    },

    [CLEAR_CART](state) {
        //清除food中的count
        state.cartFoods.forEach(food => food.count = 0)

        //移除购物车中所有购物项
        state.cartFoods = []
    },
    //更新搜索列表
    [RECEIVE_SEARCH_LIST](state, { searchList }) {
        state.searchList = searchList
    }




}
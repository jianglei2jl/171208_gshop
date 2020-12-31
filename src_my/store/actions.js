//间接更新状态的对象，组件dispatch给它，然后它通过commit给mutations
//也包含从后台获取api数据的异步操作函数
import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUserInfo,
    reqLogOut,
    reqGoods,
    reqRatings,
    reqInfo,
    reqSearchList
} from '../api'
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


export default {
    async getAddress({ commit, state }) {

        //获取经纬度，生成geohash,传给reqAddress获取参数，把参数commit给mutations
        const { latitude, longitude } = state
        const geohash = latitude + ',' + longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDERSS, { address })
        }
    },
    async getCatagorys({ commit, state }) {
        const result = await reqCategorys()
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },
    async getShops({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqShops(latitude, longitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    //同步记录用户信息
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    //异步获取用户登陆信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, { userInfo })
        }
    },
    //清空userInfo
    async logout({ commit }) {
        const result = await reqLogOut()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    //获取mockjs数据
    async getGoods({ commit }, callback) {
        const result = await reqGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
                //数据更新了，通知一下组件--回调函数也是参数，也可以传
                //如果传了就调用，不传没有值就不调用
            callback && callback()

        }
    },
    async getRatings({ commit }, cb) {
        const result = await reqRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            cb && cb()
        }
    },
    async getInfo({ commit }) {
        const result = await reqInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },
    updateFoodCount({ commit }, { isAdd, food }) {
        //判断一下增加还是减少
        if (isAdd === true) {
            commit(INCREAMENT_FOOD_COUNT, { food })
        } else {
            commit(DECREAMENT_FOOD_COUNT, { food })
        }
    },

    //清空购物车
    clearCart({ commit }) {
        commit(CLEAR_CART)
    },

    //异步获取搜索列表reqSearchList
    async getSearchList({ commit, state }, keyword) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchList(geohash, keyword)
        if (result.code === 0) {
            const searchList = result.data
            commit(RECEIVE_SEARCH_LIST, { searchList })
        }

    }


}
/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
    // const BASE_URL = 'https://elm.cangdu.org'


// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/v2/pois/${geohash}`)
    // 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL + '/v2/index_entry')
    // 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL + '/shopping/restaurants', { longitude, latitude })
    // 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/v4/restaurants', { geohash, keyword })
    // 6、用户名密码登陆
export const reqPwdLogin = ({ username, password, captcha_code }) => ajax(BASE_URL + '/v2/login', { username, password, captcha_code }, 'POST')
    // 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })
    // 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
    // 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/v1/user')
    // 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/v2/signout')

// 11、获取饿了么随机图片验证码
export const reqCaptchas = () => ajax(BASE_URL + '/v1/captchas', {}, 'POST')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
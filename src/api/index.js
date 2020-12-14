/**
 * 包含N个接口请求函数的模块
 * 函数的返回值是：promise对象
 */
//引入ajax
import ajax from './ajax'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

// [2、获取食品分类列表](#2获取食品分类列表)<br/>

export const reqFoodTypes = () => ajax('/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>


export const reqShops = (latitude, longitude) => ajax('/shops', { latitude, gitlongitude })


// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>

export const reqShopsByKey = (keyword, geohash) => ajax('/search_shops', { 'keyword': keyword, 'geohash': geohash })

// [5、获取一次性验证码](#5获取一次性验证码)<br/>

export const reqCaptcha = () => ajax('/captcha')

// [6、用户名密码登陆](#6用户名密码登陆)<br/>

export const reqLogin = (name, pwd, captcha) => ajax('/login_pwd', { 'name': name, 'pwd': pwd, 'captcha': captcha })

// [7、发送短信验证码](#7发送短信验证码)<br/>

export const reqPhone = (phone) => ajax('/sendcode', { 'phone': phone })

// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>

export const reqPhoneLogin = (phone, code) => ajax('/login_sms', { 'phone': phone, 'code': code })

// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>

export const reqUser = () => ajax('/userinfo')

// [10、用户登出](#10用户登出)<br/>

export const reqOut = () => ajax('/logout')
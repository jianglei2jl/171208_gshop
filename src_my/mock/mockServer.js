/**
 * 使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

//返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })

//返回ratings的接口
Mock.mock('/ratings', { code: 0, data: data.ratings })

//返回info的接口
Mock.mock('/info', { code: 0, data: data.info })

//export default xxx ? 不需要向外暴露，只需要执行一次即可，直接在入口文件引入即可
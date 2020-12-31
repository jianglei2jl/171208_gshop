import Vue from 'vue'
// import moment from 'moment'
// Vue.use(moment)

import format from 'date-fns/format'
// import { format } from 'date-fns'
// 注册
// Vue.filter('data-format', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
//     // 返回处理后的值
//     return moment(value).format('YYYY-MM-DD HH:mm:ss')
// })
Vue.filter('data-format', function(value, formatStr = 'yyyy-MM-dd HH:mm:ss a') {
    // 返回处理后的值
    return format(value, formatStr)
})
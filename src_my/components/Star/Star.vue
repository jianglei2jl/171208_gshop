<template>
    <div :class="`star star-${size}`">
        <span class="star-item on" v-for="(star,index) in startsArr" :key="index" :class="star"></span>


        <!-- <span class="star-item on"></span>
        <span class="star-item on"></span>
        <span class="star-item half"></span>
        <span class="star-item off"></span> -->
    </div>
</template>
<script>
export default {
    props:{
        score:Number,
        size:Number
    },
    computed:{
        //现在有shops.rating 是分数
        //根据分数生成一个数组startsArr,该数组一共五位，为['on','on','on','half','off']
        //数组先添加on，然后half，最后是off
        //假设分数为3.2  ['on','on','on','off','off']
        //假设分数为3.8  ['on','on','on','half','off']
        //总结   1、正数部分为几，就有几个on，
        //      2、小数部分大于0.5就有一个half
        startsArr(){
            //定义一个空数组
            const arr = []
            //获取分数
            const {score} = this
            for(let i=0;i<parseInt(score);i++){
                arr.push('on')
            }
            if(score*10-Math.floor(score)*10 >=5){
                arr.push('half')
            }
            while(arr.length<5){
                arr.push('off')
            }
            return arr
            // return ['on','on','on','half','off']
            
        }    

    },
    methods:{

    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl";
    // .shop_rating_order_left
        .star //2x图 3x图
            float left
            font-size 0
            .star-item
                display inline-block
                background-repeat no-repeat
            &.star-48
                .star-item
                    width 20px
                    height 20px
                    margin-right 22px
                    background-size 20px 20px
                    &:last-child
                        margin-right: 0
                    &.on
                        bg-image('./images/star48_on')
                    &.half
                        bg-image('./images/star48_half')
                    &.off
                        bg-image('./images/star48_off')
            &.star-36
                .star-item
                    width 15px
                    height 15px
                    margin-right 6px
                    background-size 15px 15px
                    &:last-child
                        margin-right 0
                    &.on
                        bg-image('./images/star36_on')
                    &.half
                        bg-image('./images/star36_half')
                    &.off
                        bg-image('./images/star36_off')
            &.star-24
                .star-item
                    width 10px
                    height 10px
                    margin-right 3px
                    background-size 10px 10px
                    &:last-child
                        margin-right 0
                    &.on
                        bg-image('./images/star24_on')
                    &.half
                        bg-image('./images/star24_half')
                    &.off
                        bg-image('./images/star24_off')
</style>
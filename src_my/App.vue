<template>
    <div id="app">
        <router-view></router-view>
       <FooterGuide v-show="$route.meta.showFooter" />
    </div>
</template>
<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import { mapActions } from 'vuex'
export default {
    // async mounted(){
    //   const result =await reqCategorys()
    //   console.log(result)
    // },
    mounted(){
      // this.$store.dispatch('getAddress')
      // this.$store.dispatch('getCatagorys')
      // this.$store.dispatch('getShops')
      // console.log(1)
      this.getAddress()
      this.getUserInfo()
    },
    methods:{
      ...mapActions(['getAddress','getUserInfo'])
    },
    components:{
        FooterGuide
    }
    
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    body
        background :#f1f1f1
    #app
        width 100%
        height 100%
        background #f5f5f5
        position relative  
        .header //头部公共css
          background-color #02a774
          position fixed
          z-index 100
          left 0
          top 0
          width 100%
          height 45px
          .header_search
            position absolute
            left 15px
            top 50%
            transform translateY(-50%)
            width 10%
            height 50%
            .iconfont
              font-size 22px
              color #fff
          .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 30%
            color #fff
            font-size 22px
            text-align center
</style>
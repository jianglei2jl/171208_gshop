<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{computeTime?`已发送(${computeTime}s)`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="!showPwd">
                  <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                  <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd?'on':'off'">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{ showPwd ?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" @closeTip='closeTip' v-show="alertShow" />
    </section>
</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
export default {
  components:{
    AlertTip
  },
  data(){
    return{
        loginWay:true,    //登陆方式，为true是短信登陆，false是密码登陆
        computeTime:0,      //倒计时的时间 
        showPwd:false,      //false为不显示密码，true为显示密码
        phone:'',          //短信登陆的手机号码
        code:'',    //短信验证码
        name:'',   //用户名
        pwd:'',     //密码
        captcha:'',  //图形验证码
        alertText:'',  //提示文本
        alertShow:false  //是否显示提示框

    }
  },
  computed:{
      rightPhone(){ //根据手机号码phone计算出结果，返回的值是true/false，判断手机号码是否合法
        const {phone}=this
        return  /^1\d{10}$/.test(phone)
      }
  },
  methods:{
      //异步获取短信验证码
      async getCode(){
        //点击触发倒计时，并发送向后台发送请求，获取数据
        if(!this.computeTime){  //在倒计时的过程中不能再点
          // 启动倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0) {
              // 停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)
          
          // 2.发送ajax请求：向指定手机号发送验证码
          const result =await reqSendCode(this.phone)
          if(result.code===1){//显示失败提示
             this.showAlert(result.msg)
             //清除定时器
            if(this.computeTime) {
               this.computeTime = 0
               clearInterval(this.intervalId)
              //  console.log(result.msg)
               this.intervalId = undefined
             }
          }

        }
      },
      //抽取showAlert汇总
      showAlert(str){
        this.alertShow=true
        this.alertText=str
      },
      //实现异步登陆
      async login(){
        const {loginWay,phone,code,name,pwd,captcha}=this
        let result;
        //先判断登陆方式loginWay为true是短信验证，false是用户名密码登陆
        if(loginWay){  //短信登陆
          if(!this.rightPhone){
            this.showAlert('手机不合法')
            return
          }
          if(!/^\d{6}$/.test(code)){
            this.showAlert('请输入6位数验证码')
            return
          }
          //成功登陆向后台发送异步登陆请求，获取用户信息 
          result=await reqSmsLogin(phone,code)
          // console.log(result)
        }else{  //密码登陆
            if(!name){
              this.showAlert('请输入用户名')
              return
            }
            if(!pwd){
              this.showAlert('请输入密码')
              return
            }
            if(!captcha){
              this.showAlert('请输入图形验证码')
              return
            }

            //成功登陆向后台发送异步登陆请求，获取用户信息 
            result=await reqPwdLogin({phone,code,captcha})
        }

         //不论登陆成功还是失败，都清一下定时器
         //清除定时器
          if(this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
            //  console.log(result.msg)
              this.intervalId = undefined
          }
       
        // alert('登陆成功')
          if(result.code===0){//登陆成功：清空输入框，跳转到/profile页面
            const user=result.data
           //把userInfo更新到vuex中
            this.$store.dispatch('recordUser',user)
            //清空并跳转
            this.phone = '' 
            this.code = ''
            this.$router.replace('/profile')
          }else{//登陆失败
              //假装成功：当msg提示文字里有“或”时，假装成功
              if(result.msg.indexOf('或')>0){
                result.name='aaa'
                const user=result
                //把userInfo更新到vuex中
                this.$store.dispatch('recordUser',user)
                this.$router.replace('/profile')
              }
              //失败了：显示新的图片验证码
              this.getCaptcha()
              //显示警告提示
              this.showAlert(result.msg)
              
          }

        // this.showAlert=true

      },
      //关闭提示框弹窗
      closeTip(){
        // alert('closeTio')
        this.alertShow=false
        this.alertText=''
      },
      //点击更新图形验证码
      getCaptcha(){
         //不是ajax请求，不需要跨域
          this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()
          console.log(event.target.src)
      }
     
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl";
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color #000  
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
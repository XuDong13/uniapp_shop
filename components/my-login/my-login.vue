<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="login-btn" @click="getuserinfo">一键登录</button>
    <text class="login-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-login",
    computed: {
      ...mapState('m_user', ['userinfo', 'redirectInfo'])
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserinfo', 'updateToken', 'updateRedirectInfo']),
      getuserinfo() {
        uni.getUserProfile({
          desc: '你的信息',
          lang: 'zh_CN',
          success: (e) => {
            console.log(e);
            this.updateUserinfo(e.userInfo)
            this.getToken(e)
          },
          fail: () => {
            uni.$showMsg('取消了登录授权！')
          }
        })
      },
      async getToken(info) {
        // 获得code的值
        const [err, res] = await uni.login()
        if (err || res.errMsg !== 'login:ok') return uni.$showMsg('请求登录失败！')
        console.log(res);
        // 整理发起请求的参数
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 发请求
        const result = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // if (result.meta.status !== 200) return uni.$showMsg('登录失败！')
        console.log(result);
        // 不是后台返回的token
        const token =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"
        this.updateToken(token)

        this.navigatorBack()
      },
      navigatorBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTap') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: '  ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(50%);
      border-radius: 100%;
    }

    .login-btn {
      width: 90%;
      background-color: #c00000;
      border-radius: 100px;
      margin: 10px 0;
    }

    .login-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>

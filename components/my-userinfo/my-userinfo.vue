<template>
  <view class="my-userinfo-container">
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="username">
        {{userinfo.nickName}}
      </view>
    </view>

    <view class="panel-list">
      <!-- 第一个 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个 -->
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="../../static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>

      <!-- 第三个 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-userinfo",
    computed: {
      ...mapState('m_user', ['userinfo'])
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateUserinfo', 'updateToken']),
      async logout() {
        const [err, res] = await uni.showModal({
          title: "提示",
          content: '确认退出登录吗？'
        }).catch(err => err)
        if (res && res.confirm) {
          this.updateAddress({})
          this.updateUserinfo({})
          this.updateToken('')
        }
        console.log(res);
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    .top-box {
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .avatar {
        display: block;
        width: 90px;
        height: 90px;
        border: 2px solid white;
        border-radius: 90px;
        box-shadow: 0 1px 5px black;
      }

      .username {
        font-size: 16px;
        color: white;
        font-weight: bold;
        margin-top: 9px;
      }
    }

    .panel-list {
      position: relative;
      top: -10px;
      padding: 0 10px;

      .panel {
        background-color: #fff;
        border-radius: 3px;
        margin-bottom: 9px;

        .panel-list-item {
          height: 45px;
          font-size: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        }

        .panel-title {
          border-bottom: 1px solid #ccc;
          font-size: 15px;
          padding-left: 10px;
          line-height: 45px;
        }

        .panel-body {
          display: flex;
          justify-content: space-around;
          align-items: center;

          .panel-item {
            font-size: 13px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
            padding: 10px 0;

            .icon {
              width: 35px;
              height: 35px;
            }
          }
        }
      }
    }
  }
</style>

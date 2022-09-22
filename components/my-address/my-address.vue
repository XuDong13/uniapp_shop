<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <view class="address-box" v-else @click="chooseAddress">
      <view class="address-box-row1">
        <view class="row1-left">
          <view class="username">
            收货人：<text>{{address.userName}}</text>
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：<text>{{address.telNumber}}</text>
          </view>
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
      <view class="address-box-row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addStr}}
        </view>
      </view>
    </view>
    <image src="../../static/cart_border@2x.png" class="border-bottom"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        // address: {}
      };
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addStr'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        const [err, success] = await uni.chooseAddress()
        if (err === null && success.errMsg === 'chooseAddress:ok') {
          this.updateAddress(success)
        }

      }
    }
  }
</script>

<style lang="scss">
  .border-bottom {
    display: block;
    width: 100%;
    height: 5px;
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    font-size: 12px;
    height: 90px;

    .address-box-row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    .address-box-row2 {
      display: flex;
      margin-top: 5px;

      .row2-left {
        white-space: nowrap;
      }

      .row2-right {}
    }
  }
</style>

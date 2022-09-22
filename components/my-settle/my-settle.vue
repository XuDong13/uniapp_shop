<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio color="#c00000" :checked="isFullCheck" @click="changeGoodsState" /><text>全选</text>
    </label>

    <view class="amount-box">
      合计：<text class="amount">￥{{allCheckedGoodsPrice}}</text>
    </view>

    <view class="settle">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkCount', 'total', 'allCheckedGoodsPrice']),
      isFullCheck() {
        return this.checkCount === this.total
      }
    },
    methods: {
      ...mapMutations('m_cart', ['changeAllCheck']),
      changeGoodsState() {
        this.changeAllCheck(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {
      .amount {
        color: #c00000;
        font-weight: bold;
      }
    }

    .settle {
      background-color: #c00000;
      height: 50px;
      line-height: 50px;
      min-width: 100px;
      text-align: center;
      color: #fff;
    }
  }
</style>

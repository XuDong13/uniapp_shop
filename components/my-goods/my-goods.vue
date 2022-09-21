<template>
  <view class="goods-item">
    <!-- 左侧 -->
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo||defaultPic" class="goods-img"></image>
    </view>
    <!-- 右侧 -->
    <view class="goods-item-right">
      <view class="goods-title">
        {{goods.goods_name}}
      </view>
      <view class="goods-price">
        ￥{{goods.goods_price | tofixed}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .goods-item-left {
      margin-right: 8px;

      .goods-img {
        width: 100px;
        height: 100px;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-title {
        font-size: 13px;
      }

      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
</style>

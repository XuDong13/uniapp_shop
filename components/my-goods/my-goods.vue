<template>
  <view class="goods-item">
    <!-- 左侧 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="radio" @click="radioChange" />
      <image :src="goods.goods_small_logo||defaultPic" class="goods-img"></image>
    </view>
    <!-- 右侧 -->
    <view class="goods-item-right">
      <view class="goods-title">
        {{goods.goods_name}}
      </view>
      <view class="goods-title-pricebox">
        <view class="goods-price">
          ￥{{goods.goods_price | tofixed}}
        </view>
        <uni-number-box :value="goods.goods_count" min="1" v-if="numberBox" @change="numChangeHandler"></uni-number-box>
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
      },
      radio: {
        type: Boolean,
        dafault: false
      },
      numberBox: {
        type: Boolean,
        dafault: false
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
    },
    methods: {
      radioChange() {
        this.$emit('radioClick', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        this.$emit('numClick', {
          goods_id: this.goods.goods_id,
          goods_count: val
        })
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
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-img {
        width: 100px;
        height: 100px;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .goods-title {
        font-size: 13px;
      }

      .goods-title-pricebox {
        display: flex;
        align-items: center;
        justify-content: space-between;


        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>

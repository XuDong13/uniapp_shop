<template>
  <view class="cart-container" v-if="cart.length!==0">
    <my-address></my-address>
    <!-- 标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <view class="cart-title-text">
        <text>购物车</text>
      </view>
    </view>

    <!-- 商品 -->

    <uni-swipe-action>
      <block v-for="(goods,index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="deleteGoods(goods)">
          <my-goods :goods="goods" :radio="true" @radioClick="radioClickHandler" :numberBox="true"
            @numClick="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <!-- 结算 -->
    <my-settle></my-settle>
  </view>

  <view class="empty-cart" v-else>
    <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
    <text class="empty-text">空空如也~</text>
  </view>
</template>

<script>
  import mixin from '@/mixins/tab-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [mixin],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateRadioChecked', 'updateGoodsCount', 'removeGoodsById']),

      radioClickHandler(e) {
        this.updateRadioChecked(e);
      },
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      deleteGoods(goods) {
        this.removeGoodsById(goods.goods_id)
      }

    },


  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;

    .cart-title-text {
      margin-left: 5px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .empty-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>

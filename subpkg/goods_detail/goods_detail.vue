<template>
  <view v-if="goods_info.goods_name" class="goods-detail-box">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="goods-info-price">
        ￥<text>{{goods_info.goods_price}}</text>
      </view>
      <!-- 标题 -->
      <view class="goods-info-title">
        <!-- 文本 -->
        <view class="goods-info-text">
          <text>{{goods_info.goods_name}}</text>
        </view>
        <!-- 收藏 -->
        <view class="goods-info-star">
          <uni-icons type="star" color="gray" size="17"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">
        <text>快递：免运费</text>
      </view>
    </view>
    <!-- 商品详情 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_info: [],
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(option) {
      const goods_id = option.goods_id
      this.getGoodsInfo(Number(goods_id));
    },
    methods: {
      async getGoodsInfo(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg();
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block"')
          .replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goods_info.pics.map(x => x.pics_big_url)
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }

      },
      buttonClick(e) {
        console.log(e)
        this.options[2].info++
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .goods-info-price {
      font-size: 18px;
      color: #c00000;
      margin: 10px 0;
    }

    .goods-info-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-info-text {
        font-size: 13px;
        margin-right: 10px;
      }

      .goods-info-star {
        width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        border-left: 1px solid #ccc;
        color: gray;
      }
    }

    .yf {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  .goods_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .goods-detail-box {
    padding-bottom: 50px;
  }
</style>

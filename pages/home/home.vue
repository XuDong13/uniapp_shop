<template>
  <view>
    <!-- 搜索 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>

    </view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index">
        <image :src="item.image_src" mode="" class="nav-img" @click="navClickHandler(item)"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <!-- 标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 图片 -->
        <view class="floor-img-box">
          <navigator class="letf-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix"
              :style="{width:item.product_list[0].image_width + 'rpx'}">
            </image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2"
              :url="item2.url">
              <image :src="item2.image_src" v-if="index2!==0" mode="widthFix"
                :style="{width:item2.image_width + 'rpx'}">
              </image>
            </navigator>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图数据列表
        swiperList: [],
        // 分类导航数据列表
        navList: [],
        // 楼层数据列表
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message;
      },
      // 获取分类导航数据
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      // 分类导航点击跳转事件
      navClickHandler(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        // 处理数据 得到一个正确的url
        res.message.forEach(floor => {
          floor.product_list.forEach(pro => {
            pro.url = '/subpkg/goods_list/goods_list?' + pro.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;

  }

  swiper {
    height: 300rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .right-img-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>

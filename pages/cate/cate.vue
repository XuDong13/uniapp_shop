<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滚动视图 -->
      <scroll-view class="scroll-view-left" scroll-y="true" :style="{height:wh+'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['scroll-view-left-item',active===index?'active':'']" @click="activeHandler(index)">
            {{item.cat_name}}
          </view>
        </block>

      </scroll-view>
      <!-- 右侧滚动视图 -->
      <scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
          <!-- 二级标题 -->
          <view>/{{item2.cat_name}}/</view>
          <!-- 三级 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3"
              @click="gotoGoodsList(item3)">
              <image :src="item3.cat_icon.replace('dev','web')"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>

      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 当前设备的可使用窗口高度
        wh: 0,
        // 一级分类列表
        cateList: [],
        // 二级分类列表
        cateLevel2: [],
        // 点击一级分类添加动态类名
        active: 0,
        // 滚动条到顶部的距离
        scrollTop: 0,
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync();
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg();
        this.cateList = res.message
        // 当点进分类tab页面的时候先默认显示第一个一级分类
        this.cateLevel2 = res.message[0].children
      },
      // 切换一级分类点击事件
      activeHandler(index) {
        this.active = index
        // 当点击一级分类的时候根据索引对二级分类列表重新赋值,得到对应的一级分类的二级分类
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
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
  .scroll-view-container {
    display: flex;

    .scroll-view-left {
      width: 120px;

      .scroll-view-left-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #ffffff;
          position: relative;

          &::before {
            content: " ";
            display: block;
            width: 3px;
            height: 30px;
            background-color: #f00000;
            position: absolute;
            top: 50%;
            left: 0%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2 {
      font-weight: bold;
      font-size: 12px;
      text-align: center;
      padding: 15px 0;
      background-color: #fff;

      .cate-lv3-list {
        display: flex;
        flex-wrap: wrap;

        .cate-lv3-item {
          display: flex;
          flex-direction: column;
          width: 33.33%;
          align-items: center;
          margin-bottom: 15px;

          image {
            width: 60px;
            height: 60px;
          }

          text {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

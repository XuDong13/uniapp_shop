<template>
  <view class="my-search-container" :style="{'backgroundColor':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <icon type="search" size="17" />
      <text class="my-search-text">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      // 增强自定义组件通用性
      bgcolor: {
        type: String,
        default: '#c00000'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .my-search-box {
      height: 36px;
      width: 100%;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;


      .my-search-text {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>

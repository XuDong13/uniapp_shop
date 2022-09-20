<template>
  <view class="search-box">


    <uni-search-bar @input="input" radius="100" cancelButton="none" placeholder="搜索" focus="true"></uni-search-bar>

    <!-- 搜索建议、 -->
    <view class="suggest-list" v-if="searchResults.length!==0">
      <view class="suggest-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
        <view class="suggest-text">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16" />
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-list" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text class="history-title-text">搜索历史</text>
        <uni-icons type="trash" size="20" @click="open"></uni-icons>
      </view>
      <!-- 记录 -->
      <view class="history-tag">
        <uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>

    <!-- 弹出提示框 -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" content="确定清空历史吗？" message="成功消息" :duration="2000" :before-close="true"
        @close="close" @confirm="confirm"></uni-popup-dialog>
    </uni-popup>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        historyList: ['a', 'b', 'c']
      };
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(value) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.kw = value
          this.getSearchResults()
        }, 500)
      },
      async getSearchResults() {
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.getSearchHistory()

      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      getSearchHistory() {
        const set = new Set(this.historyList);
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      open() {
        this.$refs.popup.open()
      },
      close() {
        // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
        // ...
        this.$refs.popup.close()
      },
      confirm(value) {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
        this.$refs.popup.close()
      },
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
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

  .uni-searchbar {
    background-color: #c00000;
  }

  .suggest-list {
    padding: 0 5px;

    .suggest-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      font-size: 12px;
      border-bottom: 1px solid #cccccc;

      .suggest-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-list {
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      border-bottom: 1px solid #cccccc;
      height: 40px;

      .history-title-text {
        font-size: 13px;
      }
    }


    .uni-tag {
      display: inline-block;
      margin-top: 5px;
      margin-right: 5px;
    }

  }
</style>

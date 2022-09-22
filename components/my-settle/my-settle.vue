<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio color="#c00000" :checked="isFullCheck" @click="changeGoodsState" /><text>全选</text>
    </label>

    <view class="amount-box">
      合计：<text class="amount">￥{{allCheckedGoodsPrice}}</text>
    </view>

    <view class="settle" @click="settlement">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        second: 3,
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkCount', 'total', 'allCheckedGoodsPrice']),
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      isFullCheck() {
        return this.checkCount === this.total
      }
    },
    methods: {
      ...mapMutations('m_cart', ['changeAllCheck']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      changeGoodsState() {
        this.changeAllCheck(!this.isFullCheck)
      },
      settlement() {
        // 进行一些必要条件的判断
        if (!this.checkCount) return uni.$showMsg('请勾选需要结算的商品！')
        if (!this.addStr) return uni.$showMsg('请选择收货地址！')
        if (!this.token) return this.delayNavigator()
        // 调用创建订单的方法
        this.payOrder()

      },
      async payOrder() {
        // 创建订单
        const orderInfo = {
          // order_price:this.allCheckedGoodsPrice
          order_price: 0.01,
          consignee_addr: this.addStr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }

        const {
          data: res
        } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        // if(res.meta.status !== 200) return uni.$showMsg('创建订单失败')
        // 得到订单编号
        // const orderNumber = res.message.order_number
        console.log(res)

        // 发起预支付请求
        const {
          data: res2
        } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
          order_number: orderNumber
        })
        if (res2.meta.status != 200) return uni.$showMsg('预付订单生成失败！')
        // 得到订单支付相关的参数
        const payInfo = res2.message.pay

        // 发起微信支付
        const {
          err,
          succ
        } = await uni.requestPayment(payInfo)
        if (err) return uni.$showMsg('订单未支付！')
        // 查询订单支付状态
        const {
          data: res3
        } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
          order_number: orderNumber
        })
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // 订单完成
        uni.showToast({
          icon: 'success',
          title: '订单支付完成！'
        })
      },
      delayNavigator() {
        this.second = 3
        this.showTip(this.second)
        this.timer = setInterval(() => {
          this.second--

          if (this.second <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTap',
                  from: '/pages/cart/cart'
                })
              }
            })

            return
          }
          this.showTip(this.second)
        }, 1000)
      },
      showTip(second) {
        uni.showToast({
          title: `请登录后再结算！${second} 秒后自动跳转到登录页`,
          icon: 'none',
          duration: 1500,
          mask: true
        })
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

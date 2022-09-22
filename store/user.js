export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo: null
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressStorage')
    },
    saveAddressStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserinfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserinfoStorage')
    },
    saveUserinfoStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenStorage')
    },
    saveTokenStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },
  getters: {
    addStr(state) {
      if (state.address.provinceName === '') return {}
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}

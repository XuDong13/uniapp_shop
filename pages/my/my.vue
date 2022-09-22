<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import mixin from '@/mixins/tab-badge.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [mixin],
    computed: {
      ...mapState('m_user', ['token'])
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">

</style>

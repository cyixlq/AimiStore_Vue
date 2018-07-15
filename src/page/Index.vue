<template>
    <div>
      <NavBar :title="title" style="background-color: darkorange;color: cornsilk" :fixed="true" @click-right="toSearchPage">
        <icon name="search" slot="right" style="color: #fff"/>
      </NavBar>
      <router-view style="margin-top:46px;margin-bottom: 50px;"/>
      <tabbar v-model="active">
        <tabbar-item icon="shop" to="/">首页</tabbar-item>
        <tabbar-item icon="records" to="/menu">分类</tabbar-item>
        <tabbar-item icon="cart" :info="cartNum" to="/cart">购物车</tabbar-item>
        <tabbar-item icon="contact" to="/me">我的</tabbar-item>
      </tabbar>
    </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem, Icon } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  computed: {
    title () {
      switch (this.$store.state.active.active) {
        case 0:
          return '首页'
        case 1:
          return '分类'
        case 2:
          return '购物车'
        case 3:
          return '我的'
        default:
          break
      }
    },
    ...mapGetters({
      cartNum: 'cart/getCartCount'
    }),
    active: {
      get: function () {
        return this.$store.state.active.active
      },
      set: function () {
      }
    }
  },
  components: {
    NavBar,
    Tabbar,
    TabbarItem,
    Icon
  },
  methods: {
    toSearchPage () {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>

</style>

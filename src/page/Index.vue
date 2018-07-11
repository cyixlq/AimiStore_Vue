<template>
    <div>
      <nav-bar :title="title" style="background-color: darkorange;color: cornsilk" :fixed="true"/>
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
import { NavBar, Tabbar, TabbarItem } from 'vant'
import { mapGetters } from 'vuex'
import cartData from '../assets/cartData'
export default {
  name: 'Index',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    title () {
      switch (this.active) {
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
    })
  },
  components: {
    NavBar,
    Tabbar,
    TabbarItem
  },
  created () {
    const path = this.$route.path
    switch (path) {
      case '/':
        this.active = 0
        break
      case '/menu':
        this.active = 1
        break
      case '/cart':
        this.active = 2
        break
      case '/me':
        this.active = 3
        break
      default:
        break
    }
    this.$store.dispatch('cart/pushAllCart', cartData)
  }
}
</script>

<style scoped>

</style>

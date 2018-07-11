<template>
  <div>
    <div style="margin-top: 5px" v-for="(item, index) in cart" :key="index">
      <div class="title">
        <Checkbox/>
        <span style="margin-left: 5px">{{item.productName}}</span>
      </div>
      <CartItem
        :goodsId="item.productId"
        :skuList="item.cartBos"/>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'vant'
import { mapGetters } from 'vuex'
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem,
    Checkbox
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart/getAllCart'
    })
  }
}
</script>

<style scoped>
.title {
  background-color: #f4f4f4;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: #ccc 1px solid;
}
</style>

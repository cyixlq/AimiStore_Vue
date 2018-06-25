<template>
  <div>
    <div>
      <div class="title">
        <input type="checkbox"/>
        <span style="margin-left: 5px">商品名称</span>
      </div>
      <CartItem/>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.title {
  background-color: #c1c1c1;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>

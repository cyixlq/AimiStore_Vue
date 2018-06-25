<template>
  <div class="item">
    <input type="checkbox" style="align-items: center"/>
    <img src="../assets/logo.png" width="70px" height="70px"/>
    <div style="flex-direction: column;display: flex;flex: 1;padding-left: 10px">
      <span>商品副标题</span>
      <span>￥13</span>
    </div>
    <div style="flex: 1">
      <Button size="small">+</Button>
      <span>3</span>
      <Button size="small" type="danger">-</Button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'CartItem',
  components: {
    Button
  }
}
</script>

<style scoped>
.item{
  display: flex;
  height: 70px;
  background-color: #ccc;
  flex-direction: row;
  align-items: center;
}
</style>

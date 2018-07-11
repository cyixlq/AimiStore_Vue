<template>
  <div>
    <div class="item" v-for="(item, index) in skuList" :key="item.productSpecVo.id">
      <Checkbox style="align-items: center"/>
      <img :src="item.productSpecVo.image" width="60px" height="60px" style="margin-left: 5px"/>
      <div style="flex-direction: column;display: flex;flex: 1;padding-left: 10px">
        <span>{{item.productTitle.substring(0, 10) + '...'}}</span>
        <div style="display: flex;flex-direction: row;align-items: center">
          <span>￥{{item.productSpecVo.price}}</span>
          <span style="margin-left: 10px">{{item.productSpecVo.name}}</span>
        </div>
      </div>
      <div style="flex: 1">
        <Button size="small" @click="optSkuNum(index,true)">+</Button>
        <span>{{item.number}}</span>
        <Button size="small" type="danger" @click="optSkuNum(index,false)">-</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox } from 'vant'
export default {
  name: 'CartItem',
  props: [
    'skuList',
    'goodsId'
  ],
  components: {
    Button,
    Checkbox
  },
  methods: {
    optSkuNum (index, isAdd) {
      let data = {
        skuId: this.skuList[index].productSpecVo.id,
        goodsId: this.goodsId,
        isAdd: isAdd
      }
      this.$store.dispatch('cart/optSkuNum', data)
    }
  }
}
</script>

<style scoped>
.item{
  display: flex;
  height: 70px;
  background-color: #f2f2f2;
  flex-direction: row;
  align-items: center;
}
</style>

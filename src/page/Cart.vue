<template>
  <div>
    <div style="margin-top: 5px" v-for="(item, index) in cart" :key="index">

      <div class="title">
        <Checkbox type="checkbox" v-model="checks[index].parent" @click.native="allCheck(index)"/>
        <span style="margin-left: 5px">{{item.productName}}</span>
      </div>

      <div class="item" v-for="(skuItem, skuIndex) in item.cartBos" :key="skuItem.productSpecVo.id">
        <Checkbox style="align-items: center" v-model="checks[index].child[skuIndex]" @click.native="changeChecks(index)"/>
        <img :src="skuItem.productSpecVo.image" width="60px" height="60px" style="margin-left: 5px"/>
        <div style="flex-direction: column;display: flex;flex: 1;padding-left: 10px">
          <span>{{skuItem.productTitle.substring(0, 10) + '...'}}</span>
          <div style="display: flex;flex-direction: row;align-items: center">
            <span>￥{{skuItem.productSpecVo.price}}</span>
            <span style="margin-left: 10px">{{skuItem.productSpecVo.name}}</span>
          </div>
        </div>
        <div style="flex: 1">
          <Button size="small" @click="optSkuNum(index, skuIndex, true)">+</Button>
          <span>{{skuItem.number}}</span>
          <Button size="small" type="danger" @click="optSkuNum(index, skuIndex, false)">-</Button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { Checkbox, Button } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    Checkbox,
    Button
  },
  data () {
    return {
      checks: this.initChecks()
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart/getAllCart'
    })
  },
  methods: {
    changeChecks (index) {
      console.log(index)
      let i = Number.parseInt(index)
      let isAllCheck = true
      for (let i in this.checks[index].child) {
        isAllCheck = isAllCheck && this.checks[index].child[i]
      }
      this.checks[i].parent = isAllCheck
    },
    allCheck (index) {
      for (let i in this.checks[index].child) {
        if (this.checks[index].parent) {
          this.checks[index].child[i] = true
        } else {
          this.checks[index].child[i] = false
        }
      }
    },
    optSkuNum (index, skuIndex, isAdd) {
      let data = {
        skuId: this.$store.state.cart.cart[index].cartBos[skuIndex].productSpecVo.id,
        goodsId: this.$store.state.cart.cart[index].productId,
        isAdd: isAdd
      }
      this.$store.dispatch('cart/optSkuNum', data)
    },
    initChecks () {
      let check = []
      for (let i in this.$store.state.cart.cart) {
        let item = {
          parent: false,
          child: []
        }
        check.push(item)
        for (let j in this.$store.state.cart.cart[i].cartBos) {
          console.log(j)
          check[i].child.push(false)
        }
      }
      console.log(check)
      return check
    }
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
.item{
  display: flex;
  height: 70px;
  background-color: #f2f2f2;
  flex-direction: row;
  align-items: center;
}
</style>

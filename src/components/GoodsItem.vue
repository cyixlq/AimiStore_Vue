<template>
    <div class="card" @click="goToGoodsDetail">
      <img :src="imgUrl" :width="width+'%'"/>
      <p>{{ title }}</p>
    </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    imgUrl: String,
    title: String,
    width: String,
    goodsId: String
  },
  methods: {
    goToGoodsDetail () {
      this.$router.push({name: 'GoodsDetail', params: {goodsId: this.goodsId}})
    }
  }
}
</script>

<style scoped>
.card{
  text-align: center;
  display: inline-block;
  border: 1px solid #ccc;
}
</style>

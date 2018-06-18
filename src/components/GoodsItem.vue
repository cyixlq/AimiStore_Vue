<template>
    <div class="card">
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
    width: String
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

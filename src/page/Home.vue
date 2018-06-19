<template>
  <div>
    <Swipe style="height: 200px;text-align: center" :autoplay="3000">
      <swipe-item v-for="(item, index) in banners" :key="index">
        <img style="height: 200px" v-lazy="item.personalityImages" />
      </swipe-item>
    </Swipe>
    <Row>
      <Col v-for="(item,index) in goods" :key="index" :span="item.sort === 1 ? 24 : 12">
        <goods-item
          :imgUrl="item.imageUrl"
          :title="item.name"
          :width="item.sort === 1 ? '100' : '50'"></goods-item>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col } from 'vant'
import GoodsItem from '@/components/GoodsItem'
import { getHomeBanners } from '../api/apiServices.js'
export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      goods: []
    }
  },
  components: {
    Swipe,
    SwipeItem,
    GoodsItem,
    Row,
    Col
  },
  created () {
    getHomeBanners().then((response) => {
      this.banners = response.data
    })
  }
}
</script>

<style scoped>

</style>

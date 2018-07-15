<template>
  <div>
    <Swipe style="height: 200px;text-align: center" :autoplay="3000">
      <swipe-item v-for="(item, index) in banners" :key="index">
        <img style="height: 200px" v-lazy="item.recommendImage" />
      </swipe-item>
    </Swipe>
    <Row>
      <Col v-for="(item,index) in goods" :key="index" :span="item.recommendCoed === '1' ? 24 : 12">
        <goods-item
          :imgUrl="item.recommendImage"
          :title="item.recommendTitle"
          :goodsId="item.productId"
          :width="item.recommendCoed === '1' ? '100' : '50'"></goods-item>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col } from 'vant'
import GoodsItem from '@/components/GoodsItem'
import { getHomeBanners, getHomeProducts } from '../api/apiServices.js'
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
    getHomeProducts().then(response => {
      this.goods = response.data
    })
  }
}
</script>

<style scoped>

</style>

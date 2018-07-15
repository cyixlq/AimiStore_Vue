<template>
    <div>
      <panel :title="sub" status="more>>">
        <row>
          <Col
            v-for="(item,index) in list"
            :key="'col'+index"
            :span="12">
            <goods-item
              :imgUrl="item.recommendImage"
              :title="item.recommendTitle"
              :goodsId="item.productId"
              width="50"/>
          </Col>
        </row>
      </panel>
    </div>
</template>

<script>
import { Panel, Row, Col } from 'vant'
import GoodsItem from '../components/GoodsItem'
export default {
  name: 'MenuItem',
  props: {
    sub: String,
    list: Array
  },
  components: {
    Panel,
    Row,
    Col,
    GoodsItem
  }
}
</script>

<style scoped>

</style>

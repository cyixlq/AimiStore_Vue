<template>
   <div>
     <nav-bar title="商品详情" class="navbar" :fixed="true">
       <div slot="left" @click="goBack">
         <icon name="arrow-left" style="color: #fff"/>
         <span style="color: #fff">返回</span>
       </div>
     </nav-bar>
     <Swipe style="height: 300px;text-align: center;margin-top: 46px" :autoplay="3000">
       <swipe-item v-for="(item, index) in subImgs" :key="index">
         <img style="height: 300px" v-lazy="item" @click="previewImg(index)"/>
       </swipe-item>
     </Swipe>
     <div style="padding: 8px;">
       <p style="font-size: 20px;margin: 3px 0;">{{ goodsTitle }}</p>
       <span style="font-size: 15px;font-style: inherit">{{ goodsSubTitle }}</span>
     </div>
     <p style="font-size: 20px;padding-left: 8px;margin: 3px 0;"><span style="color: red">价格:</span> {{ price }}</p>
     <p style="font-size: 20px;margin: 6px 8px;font-weight: bold;text-align: center">商品详情</p>
     <img v-for="(item, index) in goods.detail" :src="item" :key="'detail' + index" width="100%"/>
     <sku
       v-model="showCustomAction"
       :sku="sku"
       :goods="goods"
       :disable-stepper-input="true"
       @buy-clicked="onClickSkuBuyNow"
       @add-cart="onClickSkuAddCart"/>
     <GoodsAction>
       <goods-action-mini-btn icon="shop" text="首页" @click="onClickGoToHome"/>
       <goods-action-mini-btn icon="cart" text="购物车" @click="onClickGoToCart"/>
       <goods-action-big-btn text="选择规格" @click="onClickChooseSku" primary/>
     </GoodsAction>
   </div>
</template>

<script>
import { NavBar, Icon, Swipe, SwipeItem, GoodsAction,
  GoodsActionBigBtn, GoodsActionMiniBtn, Sku, Toast, ImagePreview } from 'vant'
import { findBoodsById } from '@/api/apiServices'
import { mapGetters } from 'vuex'
export default {
  name: 'GoodsDetail',
  props: {
    goodsId: String
  },
  components: {
    NavBar,
    Icon,
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku,
    Toast
  },
  data () {
    return {
      subImgs: [],
      goodsSubTitle: '',
      goodsTitle: '',
      price: '',
      showCustomAction: false,
      sku: {},
      goods: {}
    }
  },
  methods: {
    onClickGoToHome () {
      this.$router.push('/')
    },
    onClickGoToCart () {
      this.$router.push('/cart')
    },
    onClickChooseSku () {
      this.showCustomAction = !this.showCustomAction
    },
    onClickSkuBuyNow (skuData) {

    },
    onClickSkuAddCart (skuData) {
      if (this.token) {
        let data = {
          goodsId: this.goodsId,
          username: this.name,
          cartInfo: {
            number: skuData.selectedNum,
            productSpecVo: {
              id: skuData.selectedSkuComb.id,
              image: this.skuImage(skuData.selectedSkuComb.id),
              name: '2+128G',
              price: skuData.selectedSkuComb.price / 100
            },
            productTitle: this.goodsSubTitle
          }
        }
        this.$store.dispatch('cart/addCartItem', data).then(msg => {
          Toast(msg)
        }).catch(err => {
          Toast(err.message)
        })
      } else {
        this.$router.push('/login')
      }
    },
    goBack () {
      this.$router.back()
    },
    previewImg (index) {
      ImagePreview(this.subImgs, index)
    },
    skuImage (skuId) {
      const productSpec = this.sku.tree[0].v
      for (let i in productSpec) {
        if (productSpec[i].id === skuId) {
          return productSpec[i].imgUrl
        }
      }
      return ''
    },
    skuName (skuId) {
      const productSpec = this.sku.tree[0].v
      for (let i in productSpec) {
        if (productSpec[i].id === skuId) {
          return productSpec[i].name
        }
      }
      return ''
    }
  },
  created () {
    findBoodsById(this.goodsId).then(response => {
      const data = response.data
      let productSpecs = []
      let list = []
      let stockNum = 0 // 总库存
      let minPrice = data.productSpecs[0].price
      let maxPrice = minPrice
      for (let i in data.productSpecs) {
        let itemSpec = {
          id: data.productSpecs[i].id,
          name: data.productSpecs[i].name,
          imgUrl: data.productSpecs[i].image
        }
        let itemList = {
          id: data.productSpecs[i].id,
          price: data.productSpecs[i].price * 100,
          s1: data.productSpecs[i].id,
          stock_num: data.productSpecs[i].stock
        }
        if (minPrice > data.productSpecs[i].price) {
          minPrice = data.productSpecs[i].price
        }
        if (maxPrice < data.productSpecs[i].price) {
          maxPrice = data.productSpecs[i].price
        }
        stockNum += data.productSpecs[i].stock
        productSpecs.push(itemSpec)
        list.push(itemList)
      }
      this.sku = {
        tree: [
          {
            k: '规格', // skuKeyName：规格类目名称
            v: productSpecs,
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: list,
        price: data.productSpecs[0].price.toString(), // 默认价格（单位元）
        stock_num: stockNum // 商品总库存
      }
      this.goods = {
        // 商品标题
        title: data.name,
        // 默认商品 sku 缩略图
        picture: data.productSpecs[0].image,
        detail: data.detail
      }
      this.goodsSubTitle = data.subtitle
      this.goodsTitle = data.name
      this.price = minPrice + '~' + maxPrice
      this.subImgs = data.subImage
    })
  },
  computed: {
    ...mapGetters({
      token: 'user/userToken',
      name: 'user/userName'
    })
  }
}
</script>

<style scoped>
  .navbar{
    background-color: darkorange;
    color: cornsilk;
  }
</style>
